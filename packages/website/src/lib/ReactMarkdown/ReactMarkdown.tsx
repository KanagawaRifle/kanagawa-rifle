import 'server-only';

// packages/website/src/lib/ReactMarkdown/ReactMarkdown.tsx

import type { Root } from 'hast';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { toString } from 'hast-util-to-string';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkGithubBlockquoteAlert from 'remark-github-blockquote-alert';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { components } from './components';
import { rehypeSafeUrls } from './rehypeSafeUrls';

import 'katex/dist/katex.min.css';
import 'remark-github-blockquote-alert/alert.css';

type Props = {
  content: string;
};

export type TableOfContentsEntry = {
  id: string;
  title: string;
  level: number;
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkBreaks)
  .use(remarkGithubBlockquoteAlert)
  .use(remarkMath)
  .use(remarkRehype, {
    allowDangerousHtml: true,
    footnoteLabel: '脚注',
    footnoteLabelTagName: 'h2',
  })
  // Repository-owned HTML must be parsed before headings receive their IDs.
  .use(rehypeRaw)
  .use(rehypeKatex)
  .use(rehypeSlug)
  .use(rehypeSafeUrls);

/** Parse once so the article and its navigation share the exact same heading IDs. */
export function renderMarkdown(content: string) {
  const tree: Root = processor.runSync(processor.parse(content));
  const toc: TableOfContentsEntry[] = [];

  visit(tree, 'element', (node) => {
    if (/^h[1-6]$/.test(node.tagName) && typeof node.properties.id === 'string') {
      toc.push({
        id: node.properties.id,
        title: toString(node),
        level: Number(node.tagName.slice(1)),
      });
    }
  });

  return {
    toc,
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

export function ReactMarkdown({ content }: Props) {
  return renderMarkdown(content).body;
}
