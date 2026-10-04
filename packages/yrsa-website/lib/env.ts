import { z } from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    GOOGLE_CALENDAR_API_KEY: z.string().min(1, 'Google Calendar API Key is required'),
    GOOGLE_CALENDAR_ID_MAIN: z.string().min(1, 'Main Google Calendar ID is required'),
    GOOGLE_CALENDAR_ID_ANNUAL: z.string().min(1, 'Annual Google Calendar ID is required'),
    GA_MEASUREMENT_ID: z.string().optional(),
  });

  const vars = {
    GOOGLE_CALENDAR_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY,
    GOOGLE_CALENDAR_ID_MAIN: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID_MAIN,
    GOOGLE_CALENDAR_ID_ANNUAL: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID_ANNUAL,
    GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  };

  const result = EnvSchema.safeParse(vars);

  if (!result.success) {
    const errors = result.error.issues
      .map((err) => {
        const path = err.path.join('.');
        return `  - ${path}: ${err.message}`;
      })
      .join('\n');

    console.error('Environment validation failed!');
    console.error('Provided values:', JSON.stringify(vars, null, 2));
    console.error('Validation errors:\n', errors);

    throw new Error(`Invalid environment variables:\n${errors}`);
  }

  return result.data;
};

export const env = createEnv();
