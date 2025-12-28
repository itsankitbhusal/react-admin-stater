export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface IApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  errors: unknown | null;
  genericMessage: boolean;
}
