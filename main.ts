// One Line, One Chill — make.fun bounty u-azazex-one-line-one-chill-6d4d5488
//
// A single sentence of horror, under 200 characters, written to
// /output/entry.txt with no trailing newline.
//
// Craft notes:
// - Domestic and quiet: a child's drawings, a dead family dog, a bed.
// - The turn sits in the second clause: the dog is dead, yet the
//   daughter still draws it — now standing, now watching.
// - Nothing is announced as scary; the dread is earned by the
//   implication (the dog never left, and it is looking at the parent).
// - No mirror, doll, basement, or "behind me" cliché.
// - The rhythm builds clause by clause and the last word, "me",
//   lands the blow on the reader directly.
//
// Deterministic by construction: one constant string, no clock, no
// randomness, no network, no environment reads, Node stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "My daughter stopped drawing our dog after it died, and now she draws it standing at the foot of my bed, watching me.";

// Gate: the entry must be UTF-8 text of 1-200 characters (Unicode code
// points), and not only whitespace. Fail loudly rather than writing a
// bad entry. A single sentence is also enforced here: exactly one
// sentence-terminating period, at the very end.
function validateEntry(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must be a single sentence ending with a period");
  }
  if (text.slice(0, -1).includes(".") || text.includes("!") || text.includes("?")) {
    throw new Error("entry must be exactly one sentence");
  }
}

const OUTPUT_PATH = "/output/entry.txt";

validateEntry(ENTRY);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

// Verification helper: read back and confirm the file holds exactly
// the line and nothing else (no trailing newline, no extra bytes).
import { readFileSync } from "node:fs";
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY) {
  throw new Error("verification failed: /output/entry.txt does not match ENTRY exactly");
}
console.log(`wrote ${[...ENTRY].length} characters to ${OUTPUT_PATH}`);
