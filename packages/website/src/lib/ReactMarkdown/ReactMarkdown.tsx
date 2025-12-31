// packages/website/src/lib/ReactMarkdown/ReactMarkdown.tsx

import React from 'react';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkGithubBlockquoteAlert from 'remark-github-blockquote-alert';
import remarkMath from 'remark-math';

import { components } from '@/lib/ReactMarkdown';

import 'remark-github-blockquote-alert/alert.css';
import 'katex/dist/katex.min.css';

type Props = {
  content: string;
};

export function ReactMarkdown({ content }: Props) {
  return (
    <Markdown
      components={components}
      remarkPlugins={[
        remarkGfm, // plugin to support GFM (autolink literals, footnotes, strikethrough, tables, tasklists).
        remarkBreaks, // plugin to support hard breaks without needing spaces or escapes (turns enters into <br>s).
        remarkGithubBlockquoteAlert, // plugin to add support for GitHub Alert.
        remarkMath, // plugin to support math ($C_L$).
      ]}
      rehypePlugins={[
        rehypeKatex, // plugin to render elements with a language-math class with KaTeX.
        rehypeSlug, // plugin to add ids to headings.
        rehypeRaw, // plugin to parse the tree (and raw nodes) again, keeping positional info okay.
      ]}
      remarkRehypeOptions={{
        footnoteLabel: '脚注',
        footnoteLabelTagName: 'h2',
      }}
    >
      {content}
    </Markdown>
  );
}
