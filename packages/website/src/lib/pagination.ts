export type Pagination = {
  current: number;
  size: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type Paginated<T> = {
  data: T[];
  pagination: Pagination;
};

/** Keep archives reachable with bounded navigation even for large result sets. */
export function getPaginationPages(current: number, totalPages: number): number[] {
  const total = Math.max(1, totalPages);
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  return [...new Set([1, current - 1, current, current + 1, total])]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);
}
