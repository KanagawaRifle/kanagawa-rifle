import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import TableOfContents from '@/features/news/components/TableOfContents';

import { renderMarkdown } from '../renderMarkdown';

vi.mock('remark-github-blockquote-alert/alert.css', () => ({}));
vi.mock('katex/dist/katex.min.css', () => ({}));

function renderArticle(content: string) {
  const { body, toc } = renderMarkdown(content);
  const html = renderToStaticMarkup(
    <>
      <TableOfContents toc={toc} />
      <article>{body}</article>
    </>,
  );

  return { document: new DOMParser().parseFromString(html, 'text/html'), toc };
}

describe('Markdown rendering and table of contents', () => {
  it.each([
    ['Inline $x^2$ formula', true],
    ['$$\nx^2 + y^2\n$$', true],
    ['Ordinary Japanese text: 大会のご案内', false],
    ['```math\nx^2\n```', true],
    ['`$x^2$`\n\n```text\nx^2\n```', false],
  ])('requests math styles only for rendered formulas: %s', (content, expected) => {
    expect(renderMarkdown(content).hasMath).toBe(expected);
  });

  it('preserves raw preformatted text, mixed children and empty blocks', () => {
    const { document } = renderArticle('<pre>raw <strong>formatted</strong> text 123</pre>\n\n<pre></pre>');
    expect(document.querySelector('article')?.textContent).toContain('raw formatted text 123');
  });

  it('uses the same heading links at every heading level', () => {
    const { document, toc } = renderArticle('# One\n\n## Two\n\n### Three\n\n#### Four\n\n##### Five\n\n###### Six');
    expect(toc.map((entry) => entry.level)).toEqual([2, 3, 4, 5, 6, 6]);
    expect(document.querySelector('article h1')).toBeNull();
    for (const entry of toc) {
      expect(document.getElementById(entry.id)?.querySelector('a')?.getAttribute('href')).toBe(`#${entry.id}`);
    }
  });

  it('uses rendered headings for formatted titles, duplicates, setext headings and raw HTML', () => {
    const content = [
      '# 大会 **案内** と `結果`',
      '',
      '## 重複 [見出し](https://example.test)',
      '',
      '## 重複 [見出し](https://example.test)',
      '',
      'Setext 見出し',
      '=============',
      '',
      '### 閉じた見出し ###',
      '',
      '```markdown',
      '# コード内の偽見出し',
      '<h2>コード内の HTML</h2>',
      '```',
      '',
      '    ## インデントしたコード',
      '',
      '<h2>HTML <em>見出し</em></h2>',
      '',
      '<h2 id="existing-anchor">明示 ID</h2>',
      '',
      '## HTML *見出し*',
    ].join('\n');
    const { document, toc } = renderArticle(content);

    expect(toc).toEqual([
      { id: '大会-案内-と-結果', title: '大会 案内 と 結果', level: 2 },
      { id: '重複-見出し', title: '重複 見出し', level: 3 },
      { id: '重複-見出し-1', title: '重複 見出し', level: 3 },
      { id: 'setext-見出し', title: 'Setext 見出し', level: 2 },
      { id: '閉じた見出し', title: '閉じた見出し', level: 4 },
      { id: 'html-見出し', title: 'HTML 見出し', level: 3 },
      { id: 'existing-anchor', title: '明示 ID', level: 3 },
      { id: 'html-見出し-1', title: 'HTML 見出し', level: 3 },
    ]);

    const headings = Array.from(document.querySelectorAll('article :is(h1,h2,h3,h4,h5,h6)'));
    expect(headings.map((heading) => heading.id)).toEqual(toc.map((entry) => entry.id));
    expect(headings.map((heading) => heading.textContent)).toEqual(toc.map((entry) => entry.title));
    expect(Array.from(document.querySelectorAll('nav a'), (link) => link.getAttribute('href'))).toEqual(
      toc.map((entry) => `#${entry.id}`),
    );
    for (const heading of headings) {
      expect(heading.querySelector('a[aria-label="Link to this heading"]')?.getAttribute('href')).toBe(
        `#${heading.id}`,
      );
    }
  });

  it('resets duplicate heading IDs between articles', () => {
    const first = renderMarkdown('## 同じ見出し\n\n## 同じ見出し').toc;
    renderMarkdown('## 別の記事');

    expect(renderMarkdown('## 同じ見出し\n\n## 同じ見出し').toc).toEqual(first);
    expect(first.map((heading) => heading.id)).toEqual(['同じ見出し', '同じ見出し-1']);
  });

  it('preserves trusted HTML embeds, PDF links and images', () => {
    const { document } = renderArticle(`
<object data="/documents/result.pdf" type="application/pdf" width="100%" height="600">
  <a href="/documents/result.pdf">結果 PDF</a>
</object>

<iframe src="https://video.example.test/embed/1" title="大会動画"></iframe>

![大会写真](/images/competition.jpg)
`);

    expect(document.querySelector('object')?.getAttribute('data')).toBe('/documents/result.pdf');
    expect(document.querySelector('object')?.getAttribute('type')).toBe('application/pdf');
    expect(document.querySelector('object a')?.getAttribute('href')).toBe('/documents/result.pdf');
    expect(document.querySelector('iframe')?.getAttribute('src')).toBe('https://video.example.test/embed/1');
    const imageUrl = new URL(document.querySelector('img')!.getAttribute('src')!, 'https://example.com');
    expect(imageUrl.pathname).toBe('/_next/image');
    expect(imageUrl.searchParams.get('url')).toBe('/images/competition.jpg');
    expect(document.querySelector('img')?.getAttribute('srcset')).toContain('640w');
    expect(document.querySelector('img')?.getAttribute('loading')).toBe('lazy');
    expect(document.querySelector('img')?.getAttribute('alt')).toBe('大会写真');
  });

  it('preserves tables, alerts, math, code formatting, line breaks and footnotes', () => {
    const { document, toc } = renderArticle(`
| 種目 | 得点 |
| --- | --- |
| AR | 600 |

> [!NOTE]
> 開始時刻を確認してください。

$E = mc^2$

\`\`\`js:result.js
const score = 600;
\`\`\`

一行目
二行目

~~取り消し~~と脚注[^1]

[^1]: 補足情報
`);

    expect(document.querySelector('table th')?.textContent).toBe('種目');
    expect(document.querySelector('table td')?.textContent).toBe('AR');
    expect(document.querySelector('table')?.className).toContain('border-border');
    expect(document.querySelector('.markdown-alert-note')?.textContent).toContain('開始時刻');
    expect(document.querySelector('.katex')).not.toBeNull();
    expect(document.querySelector('article')?.textContent).toContain('result.js');
    expect(document.querySelector('code')?.textContent).toContain('const score = 600;');
    expect(document.querySelector('p br')).not.toBeNull();
    expect(document.querySelector('del')?.textContent).toBe('取り消し');
    expect(document.querySelector('[data-footnotes] h2')?.textContent).toBe('脚注');
    expect(toc).toContainEqual({ id: 'footnote-label', title: '脚注', level: 2 });
  });

  it('reserves the image ratio independently of its caption and rejects invalid dimensions', () => {
    const { document } = renderArticle('<img src="/photo.jpg" alt="大会写真" width="1200" height="800">');
    const image = document.querySelector('img')!;
    // jsdom 30 serializes a numeric CSS ratio with an explicit denominator.
    expect(image.parentElement?.style.aspectRatio).toBe('1.5 / 1');
    expect(image.parentElement?.textContent).toBe('');
    expect(image.parentElement?.nextElementSibling?.textContent).toBe('大会写真');
    for (const dimensions of ['', 'width="0" height="800"', 'width="-2" height="800"', 'width="100%" height="800"']) {
      const rendered = renderArticle(`<img src="/photo.jpg" ${dimensions}>`).document;
      expect(rendered.querySelector('img')?.parentElement?.style.aspectRatio).toBe(`${16 / 9} / 1`);
    }
  });

  it('retains URL filtering for Markdown and raw HTML resources', () => {
    const { document } = renderArticle(`
[危険なリンク](javascript:alert%281%29)

<a href="javascript:alert(1)">HTML リンク</a>

<object data="javascript:alert(1)"></object>

<iframe src="javascript:alert(1)"></iframe>
`);

    expect(Array.from(document.querySelectorAll('article a'), (link) => link.getAttribute('href'))).toEqual([
      null,
      null,
    ]);
    expect(document.querySelector('object')).not.toBeNull();
    expect(document.querySelector('object')?.getAttribute('data')).toBeNull();
    expect(document.querySelector('iframe')).not.toBeNull();
    expect(document.querySelector('iframe')?.getAttribute('src')).toBeNull();
  });

  it('omits navigation when the article has no headings', () => {
    const { document, toc } = renderArticle('見出しのない本文です。');

    expect(toc).toEqual([]);
    expect(document.querySelector('nav')).toBeNull();
  });
});
