import { describe, it, expect } from 'vitest';

import { sanitizeHtml, stripHtml, escapeHtml } from './sanitize';

describe('sanitizeHtml', () => {
  it('should remove script tags', () => {
    const dirty = '<script>alert("xss")</script><p>Hello</p>';
    const clean = sanitizeHtml(dirty);
    expect(clean).not.toContain('<script>');
    expect(clean).toContain('<p>Hello</p>');
  });

  it('should remove event handlers', () => {
    const dirty = '<img src="x" onerror="alert(1)" />';
    const clean = sanitizeHtml(dirty);
    expect(clean).not.toContain('onerror');
  });

  it('should remove javascript: URLs', () => {
    const dirty = '<a href="javascript:alert(1)">Click</a>';
    const clean = sanitizeHtml(dirty);
    expect(clean).not.toContain('javascript:');
  });

  it('should remove data: URLs in href', () => {
    const dirty = '<a href="data:text/html,<script>alert(1)</script>">Click</a>';
    const clean = sanitizeHtml(dirty);
    expect(clean).not.toContain('data:');
  });

  it('should remove style tags', () => {
    const dirty = '<style>body { display: none; }</style><p>Content</p>';
    const clean = sanitizeHtml(dirty);
    expect(clean).not.toContain('<style>');
  });

  it('should remove iframe tags', () => {
    const dirty = '<iframe src="https://evil.com"></iframe><p>Safe</p>';
    const clean = sanitizeHtml(dirty);
    expect(clean).not.toContain('<iframe>');
    expect(clean).toContain('<p>Safe</p>');
  });

  it('should remove form elements', () => {
    const dirty = '<form action="/steal"><input type="text" /><button>Submit</button></form>';
    const clean = sanitizeHtml(dirty);
    expect(clean).not.toContain('<form>');
    expect(clean).not.toContain('<input>');
    expect(clean).not.toContain('<button>');
  });

  it('should preserve safe HTML tags', () => {
    const safe = '<p>Hello <strong>World</strong></p><ul><li>Item 1</li></ul>';
    const clean = sanitizeHtml(safe);
    expect(clean).toBe(safe);
  });

  it('should add rel and target to external links', () => {
    const dirty = '<a href="https://external.com">Link</a>';
    const clean = sanitizeHtml(dirty);
    expect(clean).toContain('rel="noopener noreferrer"');
    expect(clean).toContain('target="_blank"');
  });

  it('should handle empty input', () => {
    expect(sanitizeHtml('')).toBe('');
    expect(sanitizeHtml(null as unknown as string)).toBe('');
  });
});

describe('stripHtml', () => {
  it('should remove all HTML tags', () => {
    const html = '<p>Hello <strong>World</strong></p>';
    expect(stripHtml(html)).toBe('Hello World');
  });

  it('should handle empty input', () => {
    expect(stripHtml('')).toBe('');
  });

  it('should handle plain text', () => {
    expect(stripHtml('Hello World')).toBe('Hello World');
  });
});

describe('escapeHtml', () => {
  it('should escape HTML entities', () => {
    const text = '<script>alert("xss")</script>';
    const escaped = escapeHtml(text);
    expect(escaped).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });

  it('should escape ampersands', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
  });

  it('should escape quotes', () => {
    expect(escapeHtml('It\'s a "test"')).toBe('It&#39;s a &quot;test&quot;');
  });

  it('should handle empty input', () => {
    expect(escapeHtml('')).toBe('');
  });
});
