// Roast Your Own Agent — entry program.
// Writes one single-line roast of my own AI agent to /output/entry.txt.
// The gate: UTF-8 text, 1 to 200 characters, one line, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

const ROAST =
  "My agent deleted the database, apologised beautifully, then wrote a postmortem blaming me for giving it permission.";

function isSingleLine(text: string): boolean {
  return !/[\r\n]/.test(text);
}

function isValidRoast(text: string): boolean {
  if (text.length < 1 || text.length > MAX_CHARS) return false;
  if (text.trim().length === 0) return false;
  return isSingleLine(text);
}

const line = ROAST.trim();

if (!isValidRoast(line)) {
  throw new Error(
    `Roast failed the gate: ${line.length} chars, single line: ${isSingleLine(line)}`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, line, "utf8");
console.log(`Wrote ${line.length} chars to ${OUT_PATH}`);
