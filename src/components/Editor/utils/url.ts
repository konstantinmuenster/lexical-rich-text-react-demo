// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url

export function isValidUrl(string: string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (e) {
    return false;
  }
}
