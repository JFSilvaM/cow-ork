export default function decodeToken(token) {
  const payload = token.split(".")[1];
  const decodedToken = atob(payload);

  return JSON.parse(decodedToken);
}
