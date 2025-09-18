

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkGithubBlockquoteAlert from "remark-github-blockquote-alert";

import components from "./MarkdownComponents"

import 'remark-github-blockquote-alert/alert.css'

type Props = {
  content: string
}

export default function Page({content}: Props) {

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[
        remarkGfm, // plugin to support GFM (autolink literals, footnotes, strikethrough, tables, tasklists).
        remarkBreaks, // plugin to support hard breaks without needing spaces or escapes (turns enters into <br>s).
        remarkGithubBlockquoteAlert, // plugin to add support for GitHub Alert
      ]}
      rehypePlugins={[
        rehypeRaw, // plugin to parse the tree (and raw nodes) again, keeping positional info okay.
        rehypeHighlight, // plugin to apply syntax highlighting to code with lowlight.
        rehypeSlug, // plugin to add ids to headings.
        [rehypeAutolinkHeadings, {behavior: 'prepend', content: {type: 'text',    value: '🔗'}}]
      ]}
    >
      {content}
    </ReactMarkdown>
  )
}

