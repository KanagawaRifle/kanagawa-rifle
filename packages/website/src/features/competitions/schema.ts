import { z } from 'zod';

// These are calendar dates in Japan, not timestamps. Do not parse them in the host timezone.
export const competitionDateSchema = z.iso.date();

const dateSchema = z.object({ kind: z.literal('date'), date: competitionDateSchema });
const rangeSchema = z
  .object({ kind: z.literal('range'), from: competitionDateSchema, to: competitionDateSchema })
  .refine(({ from, to }) => from <= to, { message: '開催期間の終了日は開始日以降にしてください' });

export const competitionScheduleSchema = z.discriminatedUnion('kind', [
  dateSchema,
  rangeSchema,
  z.object({
    kind: z.literal('rescheduled'),
    date: competitionDateSchema,
    previousDate: competitionDateSchema,
  }),
  z.object({ kind: z.literal('undetermined'), label: z.string().min(1).optional() }),
  z.object({
    kind: z.literal('cancelled'),
    label: z.string().min(1).optional(),
    scheduled: z.union([dateSchema, rangeSchema]).optional(),
  }),
  // Preserve published historical descriptions when the dates cannot be determined unambiguously.
  z.object({ kind: z.literal('description'), lines: z.array(z.string().min(1)).min(1) }),
]);

export const competitionActionSchema = z
  .object({
    name: z.string().min(1),
    href: z.url().optional(),
    disabled: z.boolean().optional(),
    target: z.enum(['_blank', '_self', '_parent', '_top']).optional(),
    homeLabel: z.string().min(1).optional(),
  })
  .refine((action) => action.disabled || action.href, { message: '有効なリンクには URL が必要です' });

export const competitionSchema = z.object({
  name: z.string().min(1),
  grade: z.enum(['G4', 'G3', 'G3+', 'G2', 'G1']),
  actions: z.array(competitionActionSchema),
  date: competitionScheduleSchema.optional(),
  pet: competitionScheduleSchema.optional(),
  deadline: competitionDateSchema.optional(),
  venue: z.object({ name: z.string().min(1), href: z.url() }).optional(),
  // Editorial selection: notices stay visible until explicitly unpublished, regardless of date.
  homeNotice: z.object({ published: z.boolean(), title: z.string().min(1) }).optional(),
});

export type Competition = z.infer<typeof competitionSchema>;
export type CompetitionSchedule = z.infer<typeof competitionScheduleSchema>;
