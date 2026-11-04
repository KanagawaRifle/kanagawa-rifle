import type { Components } from 'react-markdown';

import { StaticImage } from '@/components/StaticImage';

import { CodeBlock } from './CodeBlock';
import { MarkdownHeading } from './MarkdownHeading';

export const components: Components = {
  code: ({ children, ...props }) => (
    <code className="bg-muted text-secondary dark:text-secondary rounded px-1.5 py-0.5 font-mono text-sm" {...props}>
      {children}
    </code>
  ),
  pre: CodeBlock,
  h1: (props) => <MarkdownHeading level={1} {...props} />,
  h2: (props) => <MarkdownHeading level={2} {...props} />,
  h3: (props) => <MarkdownHeading level={3} {...props} />,
  h4: (props) => <MarkdownHeading level={4} {...props} />,
  h5: (props) => <MarkdownHeading level={5} {...props} />,
  h6: (props) => <MarkdownHeading level={6} {...props} />,

  // 段落
  p: ({ children, ...props }) => (
    <p className="text-foreground mb-4 leading-7" {...props}>
      {children}
    </p>
  ),

  // リスト
  ul: ({ children, ...props }) => (
    <ul className="mb-4 ml-6 list-outside list-disc space-y-1" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="mb-4 ml-6 list-outside list-decimal space-y-1" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="text-foreground leading-7" {...props}>
      {children}
    </li>
  ),

  // 引用
  blockquote: ({ children, ...props }) => {
    return (
      <blockquote className="border-muted-foreground mb-4 border-l-4 py-2 pr-4 pl-4 italic" {...props}>
        {children}
      </blockquote>
    );
  },

  // テーブル
  table: ({ children, ...props }) => (
    <div className="mb-4 overflow-x-auto">
      <table className="border-border min-w-full overflow-hidden rounded-lg border" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead className="bg-muted" {...props}>
      {children}
    </thead>
  ),

  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,

  tr: ({ children, ...props }) => (
    <tr className="border-border border-b last:border-b-0" {...props}>
      {children}
    </tr>
  ),

  th: ({ children, ...props }) => (
    <th
      className="border-border text-foreground border-r px-4 py-3 text-left text-sm font-semibold last:border-r-0"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td className="border-border text-foreground border-r px-4 py-3 text-sm last:border-r-0" {...props}>
      {children}
    </td>
  ),

  // リンク
  a: ({ children, href, ...props }) => {
    return (
      <a
        href={href}
        className="text-primary hover:text-primary/80 underline transition-colors"
        {...(href?.startsWith('#') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        {...props}
      >
        {children}
      </a>
    );
  },

  img: ({ src = '', alt = '', width, height }) => {
    if (typeof src !== 'string' || !src) return null;

    const imageWidth = Number(width);
    const imageHeight = Number(height);
    const aspectRatio =
      Number.isFinite(imageWidth) && imageWidth > 0 && Number.isFinite(imageHeight) && imageHeight > 0
        ? imageWidth / imageHeight
        : 16 / 9;
    // SEO: alt 属性が空の場合はデフォルト値を設定
    const altText = alt || 'ライフル射撃協会のニュース記事に掲載された画像';

    return (
      <span className="mb-4 block w-full">
        <span className="relative block w-full" style={{ aspectRatio }}>
          <StaticImage
            src={src}
            alt={altText}
            fill
            sizes="(min-width: 768px) 656px, calc(100vw - 40px)"
            className="m-0 rounded-md object-contain"
          />
        </span>
        {alt && <span className="text-muted-foreground mt-1 block text-center text-sm italic">{alt}</span>}
      </span>
    );
  },

  // 水平線
  hr: ({ ...props }) => <hr className="border-border my-8 border-t-2" {...props} />,

  // 強調
  strong: ({ children, ...props }) => (
    <strong className="text-foreground font-bold" {...props}>
      {children}
    </strong>
  ),

  // 斜体
  em: ({ children, ...props }) => (
    <em className="text-foreground italic" {...props}>
      {children}
    </em>
  ),

  // 取り消し線
  del: ({ children, ...props }) => (
    <del className="text-muted-foreground line-through" {...props}>
      {children}
    </del>
  ),
};
