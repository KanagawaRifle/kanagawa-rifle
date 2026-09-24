import { env } from './env';

/** Resolve published attachments against the configured asset root. */
export function getStaticFileUrl(path?: string): string {
  const base = env.STATIC_FILE_BASE_URL.replace(/\/+$/, '');
  if (!path) return base;
  if (/^https?:\/\//.test(path)) return path;
  return `${base}/${path.replace(/^\/+/, '')}`;
}
