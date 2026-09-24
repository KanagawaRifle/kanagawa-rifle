import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

import { FrontMatterSchema } from '../src/features/news/schema';

export async function createNews(root: string, title: string, published: string): Promise<string> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(published)) throw new Error('Use a publication date in YYYY-MM-DD format.');
  FrontMatterSchema.parse({ title: title.trim(), published });
  const directory = resolve(root, published.slice(0, 4));
  await mkdir(directory, { recursive: true });
  const content = `---\ntitle: ${JSON.stringify(title.trim())}\npublished: ${JSON.stringify(published)}\n---\n\n<!-- 本文を入力してください。 -->\n`;
  for (let sequence = 1; sequence <= 99; sequence++) {
    const file = resolve(directory, `${published}-${String(sequence).padStart(2, '0')}.md`);
    try {
      await writeFile(file, content, { flag: 'wx' });
      return file;
    } catch (error) {
      if (!(error instanceof Error && 'code' in error && error.code === 'EEXIST')) throw error;
    }
  }
  throw new Error(`All 99 article numbers for ${published} are already used.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { values } = parseArgs({ options: { title: { type: 'string' }, date: { type: 'string' } } });
  if (!values.title || !values.date) throw new Error('Usage: npm run new:news -- --title TITLE --date YYYY-MM-DD');
  console.log(
    await createNews(fileURLToPath(new URL('../src/contents/news', import.meta.url)), values.title, values.date),
  );
}
