import { z } from "zod";

/**
 * API validation schemas
 *
 * Centralized Zod schemas for API request validation.
 * Using Zod ensures type-safe validation with clear error messages.
 */

/**
 * Date format validation (YYYY-MM-DD)
 */
export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "日付は YYYY-MM-DD 形式で指定してください")
  .optional();

/**
 * Year (fiscal year) validation
 */
export const yearSchema = z
  .string()
  .regex(/^\d{4}$/, "年度は4桁の数字で指定してください")
  .transform((val) => parseInt(val, 10))
  .refine((val) => val >= 2000 && val <= 2100, "年度は2000〜2100の範囲で指定してください")
  .optional();

/**
 * Event name validation
 */
export const eventSchema = z
  .string()
  .min(1, "イベント名を指定してください")
  .max(20, "イベント名は20文字以内で指定してください")
  .optional();

/**
 * Name search validation
 */
export const nameSchema = z
  .string()
  .min(1, "名前を指定してください")
  .max(50, "名前は50文字以内で指定してください")
  .optional();

/**
 * Monthly results API query schema
 */
export const monthlyResultsQuerySchema = z.object({
  year: yearSchema,
  date: dateSchema,
  event: eventSchema,
  name: nameSchema,
});

/**
 * Rifle shooting class results API query schema
 */
export const rifleClassResultsQuerySchema = z.object({
  year: yearSchema,
  date: dateSchema,
  event: eventSchema,
  name: nameSchema,
});

/**
 * OGP image generation query schema
 */
export const ogpQuerySchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で指定してください")
    .default("横須賀市ライフル射撃協会"),
  subtitle: z
    .string()
    .max(100, "サブタイトルは100文字以内で指定してください")
    .optional(),
  theme: z
    .enum(["default", "cern", "win95", "modern", "terminal", "glass"])
    .default("default"),
});

/**
 * Type inference helpers
 */
export type MonthlyResultsQuery = z.infer<typeof monthlyResultsQuerySchema>;
export type RifleClassResultsQuery = z.infer<typeof rifleClassResultsQuerySchema>;
export type OgpQuery = z.infer<typeof ogpQuerySchema>;

/**
 * Parse search params with Zod schema
 *
 * @param searchParams - URLSearchParams to parse
 * @param schema - Zod schema to validate against
 * @returns Parsed and validated data or error response
 */
export function parseSearchParams<T extends z.ZodType>(
  searchParams: URLSearchParams,
  schema: T
): { success: true; data: z.infer<T> } | { success: false; error: string } {
  const rawParams: Record<string, string | undefined> = {};

  searchParams.forEach((value, key) => {
    rawParams[key] = value || undefined;
  });

  const result = schema.safeParse(rawParams);

  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    return { success: false, error: errors };
  }

  return { success: true, data: result.data };
}
