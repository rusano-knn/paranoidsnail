import escapeHtml from "escape-html";

/**
 * Escape a value for safe interpolation into an XML/HTML document.
 * Uses the `escape-html` package, which CodeQL recognizes as a proper
 * sanitizer (as recommended by the js/stored-xss query guidance).
 *
 * NOTE: Do NOT apply this to JSX text children. React already auto-escapes
 * JSX text as its built-in contextual output encoding; doing both would
 * double-escape. This is only for string-built documents (e.g. the RSS feed).
 */
export function escapeXml(input: unknown): string {
  return escapeHtml(String(input ?? ""));
}
