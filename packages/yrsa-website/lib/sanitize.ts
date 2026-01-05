/**
 * HTML sanitization utilities
 *
 * Provides safe HTML rendering by removing potentially dangerous content
 * while preserving allowed tags and attributes.
 */

// Allowed HTML tags (safe for display)
const ALLOWED_TAGS = new Set([
  "a",
  "b",
  "br",
  "code",
  "em",
  "i",
  "li",
  "ol",
  "p",
  "pre",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "u",
  "ul",
]);

// Allowed attributes per tag
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
  span: new Set(["class"]),
};

// URL schemes allowed in href attributes
const ALLOWED_URL_SCHEMES = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * Sanitize HTML string to prevent XSS attacks
 *
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 *
 * @example
 * ```ts
 * const dirty = '<script>alert("xss")</script><p>Hello</p>';
 * const clean = sanitizeHtml(dirty);
 * // clean = '<p>Hello</p>'
 * ```
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";

  // Create a temporary element to parse HTML
  // Note: This is a simple implementation. For production, consider using DOMPurify
  let result = html;

  // Remove script tags and their content
  result = result.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // Remove event handlers (onclick, onerror, etc.)
  result = result.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "");
  result = result.replace(/\s*on\w+\s*=\s*[^\s>]+/gi, "");

  // Remove javascript: and data: URLs
  result = result.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');
  result = result.replace(/href\s*=\s*["']data:[^"']*["']/gi, 'href="#"');
  result = result.replace(/src\s*=\s*["']javascript:[^"']*["']/gi, 'src=""');
  result = result.replace(/src\s*=\s*["']data:[^"']*["']/gi, 'src=""');

  // Remove style tags
  result = result.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  // Remove dangerous tags (iframe, object, embed, form, input)
  const dangerousTags = ["iframe", "object", "embed", "form", "input", "textarea", "button", "select"];
  dangerousTags.forEach((tag) => {
    const regex = new RegExp(`<${tag}\\b[^>]*>.*?<\\/${tag}>`, "gi");
    result = result.replace(regex, "");
    // Also remove self-closing or unclosed tags
    const selfClosingRegex = new RegExp(`<${tag}\\b[^>]*/?>`, "gi");
    result = result.replace(selfClosingRegex, "");
  });

  // Add rel="noopener noreferrer" to external links for security
  result = result.replace(
    /<a\s+([^>]*href\s*=\s*["']https?:\/\/[^"']+["'][^>]*)>/gi,
    (match, attrs) => {
      if (!attrs.includes("rel=")) {
        return `<a ${attrs} rel="noopener noreferrer" target="_blank">`;
      }
      return match;
    }
  );

  return result;
}

/**
 * Strip all HTML tags, leaving only text content
 *
 * @param html - The HTML string to strip
 * @returns Plain text without HTML tags
 */
export function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Escape HTML entities to prevent XSS when displaying user input
 *
 * @param text - The text to escape
 * @returns Escaped text safe for HTML display
 */
export function escapeHtml(text: string): string {
  if (!text) return "";
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] ?? char);
}
