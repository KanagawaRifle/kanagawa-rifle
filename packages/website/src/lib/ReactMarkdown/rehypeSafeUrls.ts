import type { Root } from 'hast';
import { urlAttributes } from 'html-url-attributes';
import { defaultUrlTransform } from 'react-markdown';
import { visit } from 'unist-util-visit';

/** Preserve react-markdown's URL filtering for links and embedded resources. */
export function rehypeSafeUrls() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      for (const [property, tags] of Object.entries(urlAttributes)) {
        if (Object.hasOwn(node.properties, property) && (tags === null || tags.includes(node.tagName))) {
          node.properties[property] = defaultUrlTransform(String(node.properties[property] || ''));
        }
      }
    });
  };
}
