// Dad Joke Showdown — writes one dad joke to /output/entry.txt
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "What does a thesaurus eat for breakfast? Synonym rolls.";
// The pun does the whole job: breakfast is the setup, the rolls are the payoff.

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
// A thesaurus dad keeps every word: the joke is fifty-five characters and none of them idles.

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const chars = [...JOKE].length;
if (chars < 1 || chars > 200) fail(`joke must be 1-200 characters, got ${chars}`);
if (JOKE.trim().length === 0) fail("joke must not be only whitespace");
if (/[\u0000-\u001f\u007f]/.test(JOKE)) fail("joke must not contain control characters");

mkdirSync(outDir, { recursive: true });
// Clear the output dir's CONTENTS only — never rmSync the dir itself (it may be a mount point).
for (const f of readdirSync(outDir)) rmSync(join(outDir, f), { recursive: true, force: true });
writeFileSync(join(outDir, "entry.txt"), JOKE + "\n", "utf8");
// Read back and confirm the file is byte-exact before reporting success.
if (readFileSync(join(outDir, "entry.txt"), "utf8") !== JOKE + "\n") {
  fail("entry.txt read-back mismatch");
}
