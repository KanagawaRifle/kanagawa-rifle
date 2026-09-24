import { Children, isValidElement, type CSSProperties, type ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CODE_BLOCK_STYLE: CSSProperties = {
  margin: 0,
  padding: '16px',
  background: '#1e1e1e',
  fontSize: '14px',
  lineHeight: '1.5',
};

function getTextContent(children: ReactNode): string {
  return Children.toArray(children)
    .map((child): string => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      return isValidElement<{ children?: ReactNode }>(child) ? getTextContent(child.props.children) : '';
    })
    .join('');
}

export function CodeBlock({ children }: { children?: ReactNode }) {
  const child = Children.toArray(children)[0];
  const className = isValidElement<{ className?: string }>(child) ? (child.props.className ?? '') : '';
  const info = /(?:^|\s)language-(\S+)/.exec(className)?.[1] ?? '';
  const [language, ...filenameParts] = info.split(':');
  const filename = filenameParts.join(':');

  return (
    <div className="my-6 overflow-hidden rounded-lg">
      <div className="border-border flex items-center space-x-2 rounded-r-lg border-b">
        {filename && (
          <div className="border-border bg-card text-foreground rounded-t-lg border-x border-t px-4 py-2 text-sm font-medium">
            {filename}
          </div>
        )}
        {language && (
          <div className="text-muted-foreground px-3 py-1 font-mono text-xs tracking-wide uppercase">{language}</div>
        )}
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={vscDarkPlus}
        className={filename ? 'rounded-r-lg' : 'rounded-lg'}
        PreTag="div"
        customStyle={CODE_BLOCK_STYLE}
      >
        {getTextContent(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
}
