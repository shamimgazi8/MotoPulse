// utils/api.ts

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions<T = any> {
  method?: HttpMethod;
  body?: T;
  headers?: Record<string, string>;
  token?: string;
}

export async function fetchAPI<TResponse = any, TBody = any>(
  url: string,
  options?: FetchOptions<TBody>
): Promise<TResponse> {
  const { method = "GET", body, headers = {}, token } = options || {};

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: method !== "GET" && body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "API request failed");
  }

  return res.json();
}
