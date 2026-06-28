const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5050';

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(response.status, await extractErrorMessage(response));
  }

  // 204 No Content (e.g. DELETE) has no body to parse.
  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (data?.errors) {
      return Object.values(data.errors).flat().join(' ');
    }
    if (data?.title) return data.title;
    if (data?.message) return data.message;
  } catch {
    // Response body was not JSON; fall through to a generic message.
  }
  return `Request failed with status ${response.status}`;
}
