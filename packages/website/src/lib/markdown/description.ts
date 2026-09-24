import 'server-only';

import { SKIP, visit } from 'unist-util-visit';

import { parseMarkdown } from './parse';

/** Reuse the rendered tree; omit markup, URLs, scripts, and code blocks from snippets. */
export function getMarkdownDescription(content: string): string {
  const { tree } = parseMarkdown(content);
  const parts: string[] = [];
  visit(tree, (node) => {
    if (node.type === 'element') {
      if (['script', 'style', 'pre', 'math'].includes(node.tagName) || node.properties.hidden) return SKIP;
      if (/^(p|div|h[1-6]|li|br|tr|td|th|blockquote)$/.test(node.tagName)) parts.push(' ');
    }
    if (node.type === 'text') parts.push(node.value);
    return undefined;
  });
  const text = parts.join('').replace(/\s+/g, ' ').trim();
  const characters = Array.from(text);
  return characters.length > 160 ? `${characters.slice(0, 159).join('')}…` : text;
}
