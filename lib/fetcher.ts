import { getToken } from "@/lib/storage";

export async function fetchJson<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const token = getToken();

  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...init?.headers,
    },
  });

  const data = (await response.json()) as T;

  if (!response.ok) {
    throw data;
  }

  return data;
}