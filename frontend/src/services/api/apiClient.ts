const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? '';

type ApiClientOptions = RequestInit & {
  token?: string;
};

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

export async function apiClient<T>(
  path: string,
  options?: ApiClientOptions
): Promise<T> {
  const { token, headers, ...fetchOptions } = options ?? {};

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const data = await parseResponse<ApiErrorResponse | T>(response);

  if (!response.ok) {
    const errorMessage =
      (data as ApiErrorResponse)?.error ||
      (data as ApiErrorResponse)?.message ||
      `API request failed: ${response.status}`;

    throw new Error(errorMessage);
  }

  return data as T;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();

  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}