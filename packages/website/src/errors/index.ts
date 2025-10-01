// packages/website/src/types/api.ts

import { ApiError } from '@/types';

export const createNewsNotFoundError = (slug: string): ApiError => ({
  message: `News with slug "${slug}" not found`,
  status: 404,
  code: 'NEWS_NOT_FOUND',
});

export const createValidationError = (message: string): ApiError => ({
  message,
  status: 400,
  code: 'VALIDATION_ERROR',
});

export const createInvalidNewsSlugError = (): ApiError => ({
  message: `Invalid slug parameter`,
  status: 400,
  code: 'INVALID_NEWS_SLUG',
});

export const createInternalServerError = (error: Error): ApiError => ({
  message: `API Error: ${error.message}`,
  status: 500,
  code: 'INTERNAL_SERVER',
});
