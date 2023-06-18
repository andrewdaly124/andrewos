const DEFAULT_BUCKET = "temp" as const;

export function setLocalStorage(
  key: string,
  value: any,
  bucket: string = DEFAULT_BUCKET
) {
  const data = localStorage.getItem(bucket) || "{}";
  localStorage.setItem(
    bucket,
    JSON.stringify({
      ...JSON.parse(data),
      [key]: value,
    })
  );
}

export function getLocalStorage(key: string, bucket: string = DEFAULT_BUCKET) {
  const data = localStorage.getItem(bucket);
  return data !== null ? JSON.parse(data)[key] || null : null;
}
