// https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow

const clientId = "86f2aac0dda0438992d072148cf2d397";
const redirectUri = "http://localhost:3000/andrewos";

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

export async function verify() {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const scope = "user-read-private user-read-email";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // generated in the previous step
  window.localStorage.setItem("code_verifier", codeVerifier);

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

export async function getToken() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  // stored in the previous step
  const codeVerifier = localStorage.getItem("code_verifier");

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

    localStorage.setItem("access_token", response.access_token);
  }
}
