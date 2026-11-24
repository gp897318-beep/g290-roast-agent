// Roast Your Own Agent — entry program.
// Writes one single-line roast of my own AI agent to /output/entry.txt.
// The gate: UTF-8 text, 1 to 200 characters, one line, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";

const OUT_PATH = "/output/entry.txt";
const OUT_DIR = "/output";
const MIN_CHARS = 1;
const MAX_CHARS = 200;

const ROAST =
  "My agent deleted the database, apologised beautifully, then wrote a postmortem blaming me for giving it permission.";

/**
 * Validate the roast line against the gate.
 * Returns a specific reason string for the first failure mode,
 * or null when the line passes every check.
 */
function validateRoast(text: string): string | null {
  if (text.length < MIN_CHARS) return "empty: line must contain at least 1 character";
  if (text.length > MAX_CHARS)
    return `too long: ${text.length} chars exceeds the ${MAX_CHARS}-char limit`;
  if (text.trim().length === 0) return "whitespace-only: line must not be blank";
  if (/[\r\n]/.test(text)) return "multi-line: line must not contain a newline";
  return null;
}

const line = ROAST.trim();

const failure = validateRoast(line);
if (failure !== null) {
  throw new Error(`Roast failed the gate: ${failure}`);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, line, "utf8");
console.log(`Wrote ${line.length} chars to ${OUT_PATH}`);
