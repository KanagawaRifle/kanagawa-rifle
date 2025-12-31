// packages/website/src/lib/ReactMarkdown/components.tsx

import Image from 'next/image';
import React, { ReactNode } from 'react';
import { LuLink } from 'react-icons/lu';
import { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// SyntaxHighlighter のスタイル定数（毎レンダリング時のオブジェクト生成を回避）
const CODE_BLOCK_STYLE: React.CSSProperties = {
  margin: 0,
  padding: '16px',
  background: '#1e1e1e',
  fontSize: '14px',
  lineHeight: '1.5',
};

const getTextContent = (children: ReactNode): string => {
  if (children == null) return '';

  const mapped = React.Children.map(children, (child) => {
    if (typeof child === 'string') return child;

    if (React.isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
      return getTextContent(child.props.children);
    }

    return '';
  });

  return mapped?.join('') ?? '';
};

export const components: Components = {
  // インラインコード
  code: ({ children, ...props }) => {
    return (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-pink-600" {...props}>
        {children}
      </code>
    );
  },

  // ブロックコード（<pre> が呼ばれる）
  pre: ({ children }) => {
    const codeElement = children as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;

    const className = codeElement.props?.className ?? '';
    const match = /language-(.+)/.exec(className);
    const fullLanguage = match ? match[1] : '';

    let filename = '';
    let actualLanguage = fullLanguage;

    if (fullLanguage?.includes(':')) {
      const parts = fullLanguage.split(':');
      actualLanguage = parts[0];
      filename = parts.slice(1).join(':');
    }

    return (
      <div className="my-6 overflow-hidden rounded-lg">
        {/* タブ部分 */}
        <div className="flex items-center space-x-2 rounded-r-lg border-b border-gray-200">
          {filename && (
            <div className="rounded-t-lg border-x border-t border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900">
              {filename}
            </div>
          )}
          {actualLanguage && (
            <div className="px-3 py-1 font-mono text-xs tracking-wide text-gray-500 uppercase">{actualLanguage}</div>
          )}
        </div>

        {/* コード部分 */}
        <SyntaxHighlighter
          language={actualLanguage ?? 'text'}
          style={vscDarkPlus}
          className={filename ? 'rounded-r-lg' : 'rounded-lg'}
          PreTag="div"
          customStyle={CODE_BLOCK_STYLE}
        >
          {getTextContent(codeElement.props?.children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  },

  // 見出し
  h1: ({ children, id, ...props }) => (
    <h1
      id={id}
      className="group relative mt-8 mb-6 border-b-2 border-gray-200 pb-3 text-3xl font-bold text-gray-900 first:mt-0"
      {...props}
    >
      {id && (
        <a
          href={`#${id}`}
          className="absolute top-0 -left-7 hidden translate-y-1/2 no-underline opacity-0 transition-opacity group-hover:opacity-50 hover:!opacity-100 md:block"
          aria-label="Link to this heading"
        >
          <LuLink className="h-5 w-5" />
        </a>
      )}
      {children}
    </h1>
  ),

  h2: ({ children, id, ...props }) => (
    <h2
      id={id}
      className="group relative mt-8 mb-4 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900"
      {...props}
    >
      {id && (
        <a
          href={`#${id}`}
          className="absolute top-0 -left-7 hidden translate-y-1/2 no-underline opacity-0 transition-opacity group-hover:opacity-50 hover:!opacity-100 md:block"
          aria-label="Link to this heading"
        >
          <LuLink className="h-5 w-5" />
        </a>
      )}
      {children}
    </h2>
  ),

  h3: ({ children, id, ...props }) => (
    <h3 id={id} className="group relative mt-6 mb-3 text-xl font-bold text-gray-900" {...props}>
      {id && (
        <a
          href={`#${id}`}
          className="absolute top-0 -left-7 hidden translate-y-1/2 no-underline opacity-0 transition-opacity group-hover:opacity-50 hover:!opacity-100 md:block"
          aria-label="Link to this heading"
        >
          <LuLink className="h-5 w-5" />
        </a>
      )}
      {children}
    </h3>
  ),

  h4: ({ children, id, ...props }) => (
    <h4 id={id} className="group relative mt-5 mb-3 text-lg font-semibold text-gray-900" {...props}>
      {id && (
        <a
          href={`#${id}`}
          className="absolute top-0 -left-7 hidden translate-y-1/2 no-underline opacity-0 transition-opacity group-hover:opacity-50 hover:!opacity-100 md:block"
          aria-label="Link to this heading"
        >
          <LuLink className="h-5 w-5" />
        </a>
      )}
      {children}
    </h4>
  ),

  h5: ({ children, id, ...props }) => (
    <h5 id={id} className="group relative mt-4 mb-2 text-base font-semibold text-gray-900" {...props}>
      {id && (
        <a
          href={`#${id}`}
          className="absolute top-0 -left-7 hidden translate-y-1/2 no-underline opacity-0 transition-opacity group-hover:opacity-50 hover:!opacity-100 md:block"
          aria-label="Link to this heading"
        >
          <LuLink className="h-5 w-5" />
        </a>
      )}
      {children}
    </h5>
  ),

  h6: ({ children, id, ...props }) => (
    <h6 id={id} className="group relative mt-4 mb-2 text-sm font-semibold text-gray-900" {...props}>
      {id && (
        <a
          href={`#${id}`}
          className="absolute top-0 -left-7 hidden translate-y-1/2 no-underline opacity-0 transition-opacity group-hover:opacity-50 hover:!opacity-100 md:block"
          aria-label="Link to this heading"
        >
          <LuLink className="h-5 w-5" />
        </a>
      )}
      {children}
    </h6>
  ),

  // 段落
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-7 text-gray-700" {...props}>
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
    <li className="leading-7 text-gray-700" {...props}>
      {children}
    </li>
  ),

  // 引用
  blockquote: ({ children, ...props }) => {
    return (
      <blockquote className="mb-4 border-l-4 border-gray-400 py-2 pr-4 pl-4 italic" {...props}>
        {children}
      </blockquote>
    );
  },

  // テーブル
  table: ({ children, ...props }) => (
    <div className="mb-4 overflow-x-auto">
      <table className="min-w-full overflow-hidden rounded-lg border border-gray-200" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50" {...props}>
      {children}
    </thead>
  ),

  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,

  tr: ({ children, ...props }) => (
    <tr className="border-b border-gray-200 last:border-b-0" {...props}>
      {children}
    </tr>
  ),

  th: ({ children, ...props }) => (
    <th
      className="border-r border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900 last:border-r-0"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-700 last:border-r-0" {...props}>
      {children}
    </td>
  ),

  // リンク
  a: ({ children, href, ...props }) => {
    return (
      <a
        href={href}
        className="text-blue-600 underline transition-colors hover:text-blue-800"
        {...(href?.startsWith('#') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        {...props}
      >
        {children}
      </a>
    );
  },

  img: ({ src = '', alt = '', width, height }) => {
    if (typeof src !== 'string') return null;

    const aspectRatio = width && height ? Number(height) / Number(width) : 9 / 16;
    // SEO: alt 属性が空の場合はデフォルト値を設定
    const altText = alt || 'ライフル射撃協会のニュース記事に掲載された画像';

    return (
      <span className="relative mb-4 block w-full" style={{ paddingTop: `${aspectRatio * 100}%` }}>
        <Image src={src} alt={altText} fill className="rounded-md object-contain" />
        {alt && <span className="mt-1 block text-center text-sm text-gray-500 italic">{alt}</span>}
      </span>
    );
  },

  // 水平線
  hr: ({ ...props }) => <hr className="my-8 border-t-2 border-gray-200" {...props} />,

  // 強調
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-gray-900" {...props}>
      {children}
    </strong>
  ),

  // 斜体
  em: ({ children, ...props }) => (
    <em className="text-gray-700 italic" {...props}>
      {children}
    </em>
  ),

  // 取り消し線
  del: ({ children, ...props }) => (
    <del className="text-gray-500 line-through" {...props}>
      {children}
    </del>
  ),

  // 脚注のセクション (<section data-footnotes>)
  // section: ({ children, 'data-footnotes': dataFootnotes, ...props }) => {
  //   return <div>{children}</div>;
  // },
};
