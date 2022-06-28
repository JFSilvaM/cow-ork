const BASE_URL = "http://localhost:3001/api";

export default async function fetchEndpoint(
  path,
  token = null,
  method = "GET",
  body = null
) {
  const fetchOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token && `Bearer ${token}`,
    },
    body: body && JSON.stringify(body),
  };

  const res = await fetch(BASE_URL + path, fetchOptions);
  const json = await res.json();

  if (!res.ok || json.status === "error") {
    throw new Error(json.message || res.statusText);
  }

  return json.data;
}
