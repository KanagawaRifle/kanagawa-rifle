import 'server-only';

import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

import { parseMarkdown } from '@/lib/markdown/parse';

import { components } from './elements';

/** Render the same tree used to collect the table of contents. */
export function renderMarkdown(content: string) {
  const { tree, toc, hasMath } = parseMarkdown(content);
  return {
    toc,
    hasMath,
    body: toJsxRuntime(tree, {
      Fragment,
      jsx,
      jsxs,
      components,
      ignoreInvalidStyle: true,
      passKeys: true,
    }),
  };
}
