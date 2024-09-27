// TODO (ada): this is dirty
// https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
import { getLocalStorage, setLocalStorage } from "./localStorage";

const clientId = "86f2aac0dda0438992d072148cf2d397";
//@ts-ignore
const redirectUri = import.meta.env.VITE_APP_REDIRECT_URI;

console.log(redirectUri);

export const SPOTIFY_API_BUCKET = "SPOTIFY_AUTH_V1";
const CODE_VERIFIER_LOCAL_STORAGE_KEY = "code_verifier";

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export async function spotifyVerify() {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const scope = "user-read-private user-read-email user-library-read";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // generated in the previous step
  setLocalStorage(
    CODE_VERIFIER_LOCAL_STORAGE_KEY,
    codeVerifier,
    SPOTIFY_API_BUCKET
  );

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

export async function getToken(): Promise<string | null> {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  // stored in the previous step
  const codeVerifier: string | null = getLocalStorage(
    CODE_VERIFIER_LOCAL_STORAGE_KEY,
    SPOTIFY_API_BUCKET
  );

  console.log({ code, codeVerifier });

  if (code && codeVerifier) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response = await body.json();

    return response.access_token;
  }

  console.error("Could not get token");
  return null;
}
