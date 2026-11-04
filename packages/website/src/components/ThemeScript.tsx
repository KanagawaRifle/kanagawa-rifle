import { applyTheme, readTheme } from '@/lib/theme';

const themeScript = `(${applyTheme.toString()})((${readTheme.toString()})())`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
