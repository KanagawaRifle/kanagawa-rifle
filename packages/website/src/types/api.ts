// packages/website/src/types/api.ts

export type ApiResponse<T> = {
  data: T | null;
  error?: ApiError;
}

export type ApiError = {
  message: string;
  code?: string;
  status: number;
}

export type Pagination = {
  current: number;
  size: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export type Paginated<T> = {
  data: T[];
  pagination: Pagination;
}
