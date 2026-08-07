/**
 * Treat stored content (MDX/YAML frontmatter and body) as untrusted at the
 * boundary. These helpers neutralize anything that could later reach an HTML
 * or XML sink, so downstream rendering is safe by construction.
 */

/** Strip HTML/script-bearing characters from plain-text metadata. */
export function sanitizeText(input: unknown): string {
  const s = String(input ?? "");
  return s
    .replace(/<[^>]*>/g, "") // drop any HTML/XML tags entirely
    .replace(/\r/g, " ")
    .replace(/\u0000/g, "") // remove null bytes
    .trim();
}

/** Escape a value for safe interpolation into an XML/HTML document. */
export function escapeXml(input: unknown): string {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
