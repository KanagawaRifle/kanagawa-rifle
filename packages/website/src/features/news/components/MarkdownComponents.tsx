import React, {ReactNode} from "react";
import {Components} from 'react-markdown';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";

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

const components: Components = {

  // インラインコード
  code: ({ children, ...props }) => {
    return (
      <code
        className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      >
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

    const className = codeElement.props?.className ?? "";
    const match = /language-(.+)/.exec(className);
    const fullLanguage = match ? match[1] : "";

    let filename = "";
    let actualLanguage = fullLanguage;

    if (fullLanguage?.includes(":")) {
      const parts = fullLanguage.split(":");
      actualLanguage = parts[0];
      filename = parts.slice(1).join(":");
    }

    return (
      <div className="my-6 rounded-lg overflow-hidden">
        {/* タブ部分 */}
        <div className="flex items-center space-x-2 border-b border-gray-200 rounded-r-lg">
          {filename && (
            <div className="px-4 py-2 bg-white rounded-t-lg border-x border-t border-gray-200 text-sm font-medium text-gray-900">
              {filename}
            </div>
          )}
          {actualLanguage && (
            <div className="px-3 py-1 text-xs font-mono text-gray-500 uppercase tracking-wide">
              {actualLanguage}
            </div>
          )}
        </div>

        {/* コード部分 */}
        <SyntaxHighlighter
          language={actualLanguage ?? "text"}
          style={vscDarkPlus}
          className={filename ? "rounded-r-lg" : "rounded-lg"}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: "16px",
            background: "#1e1e1e",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          {getTextContent(codeElement.props?.children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    );
  },
  // 見出し
  h1: ({children, ...props}) => (
    <h1
      className="text-3xl font-bold text-gray-900 mb-6 mt-8 pb-3 border-b-2 border-gray-200 first:mt-0  no-underline"
      {...props}
    >
      {children}
    </h1>
  ),

  h2: ({children, ...props}) => (
    <h2
      className="text-2xl font-bold text-gray-900 mb-4 mt-8 pb-2 border-b border-gray-200"
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({children, ...props}) => (
    <h3
      className="text-xl font-bold text-gray-900 mb-3 mt-6"
      {...props}
    >
      {children}
    </h3>
  ),

  h4: ({children, ...props}) => (
    <h4
      className="text-lg font-semibold text-gray-900 mb-3 mt-5"
      {...props}
    >
      {children}
    </h4>
  ),

  h5: ({children, ...props}) => (
    <h5
      className="text-base font-semibold text-gray-900 mb-2 mt-4"
      {...props}
    >
      {children}
    </h5>
  ),

  h6: ({children, ...props}) => (
    <h6
      className="text-sm font-semibold text-gray-900 mb-2 mt-4"
      {...props}
    >
      {children}
    </h6>
  ),

// 段落
  p: ({children, ...props}) => (
    <p
      className="text-gray-700 leading-7 mb-4"
      {...props}
    >
      {children}
    </p>
  ),

// リスト
  ul: ({children, ...props}) => (
    <ul
      className="list-disc list-outside ml-6 mb-4 space-y-1"
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({children, ...props}) => (
    <ol
      className="list-decimal list-outside ml-6 mb-4 space-y-1"
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({children, ...props}) => (
    <li
      className="text-gray-700 leading-7"
      {...props}
    >
      {children}
    </li>
  ),


  // 引用
  blockquote: ({children, ...props}) => {
    return (
      <blockquote
        className="border-l-4 border-gray-400 pl-4 pr-4 py-2 mb-4 italic"
        {...props}
      >
        {children}
      </blockquote>
    );
  },

// テーブル
  table: ({children, ...props}) => (
    <div className="overflow-x-auto mb-4">
      <table
        className="min-w-full border border-gray-200 rounded-lg overflow-hidden"
        {...props}
      >
        {children}
      </table>
    </div>
  ),

  thead: ({children, ...props}) => (
    <thead
      className="bg-gray-50"
      {...props}
    >
    {children}
    </thead>
  ),

  tbody: ({children, ...props}) => (
    <tbody {...props}>
    {children}
    </tbody>
  ),

  tr: ({children, ...props}) => (
    <tr
      className="border-b border-gray-200 last:border-b-0"
      {...props}
    >
      {children}
    </tr>
  ),

  th: ({children, ...props}) => (
    <th
      className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200 last:border-r-0"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({children, ...props}) => (
    <td
      className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200 last:border-r-0"
      {...props}
    >
      {children}
    </td>
  ),

// リンク
  a: ({children, href, ...props}) => (
    <a
      href={href}
      className="text-blue-600 underline hover:text-blue-800 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),

// 画像
  img: ({src, alt, ...props}) => (
    <div className="mb-4">
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200"
        {...props}
      />
      {alt && (
        <p className="text-center text-sm text-gray-500 mt-2 italic">
          {alt}
        </p>
      )}
    </div>
  ),

// 水平線
  hr: ({...props}) => (
    <hr
      className="my-8 border-t-2 border-gray-200"
      {...props}
    />
  ),

// 強調
  strong: ({children, ...props}) => (
    <strong
      className="font-bold text-gray-900"
      {...props}
    >
      {children}
    </strong>
  ),

// 斜体
  em: ({children, ...props}) => (
    <em
      className="italic text-gray-700"
      {...props}
    >
      {children}
    </em>
  ),

// 取り消し線
  del: ({children, ...props}) => (
    <del
      className="line-through text-gray-500"
      {...props}
    >
      {children}
    </del>
  ),
};

export default components
