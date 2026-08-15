// Merges new question files from json_files/ into src/data/questions.json.
// Only the newly added questions get their options shuffled (so the correct
// answer isn't predictably in the same position) -- questions already in the
// bank are left untouched, so re-running this doesn't reshuffle answers a
// tester has already seen. Run after adding files to json_files/.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const questionsPath = join(root, "src", "data", "questions.json");
const jsonFilesDir = join(root, "json_files");

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const existing = JSON.parse(readFileSync(questionsPath, "utf-8"));
const existingIds = new Set(existing.map((q) => q.id));

let added = 0;
let skipped = 0;
const newQuestions = [];

if (existsSync(jsonFilesDir)) {
  for (const file of readdirSync(jsonFilesDir)) {
    if (!file.endsWith(".json")) continue;
    const incoming = JSON.parse(readFileSync(join(jsonFilesDir, file), "utf-8"));
    for (const q of incoming) {
      if (existingIds.has(q.id)) {
        skipped++;
        continue;
      }
      existing.push(q);
      existingIds.add(q.id);
      newQuestions.push(q);
      added++;
    }
  }
}

// Only shuffle options for questions newly added in this run -- existing
// questions keep whatever order they were already fixed to.
for (const q of newQuestions) {
  q.options = shuffle(q.options).map((opt, i) => ({ ...opt, id: i + 1 }));
}

existing.sort((a, b) => a.id - b.id);

writeFileSync(questionsPath, JSON.stringify(existing, null, 2) + "\n", "utf-8");

console.log(`Merged: ${added} added, ${skipped} skipped (duplicate id).`);
console.log(`Total questions: ${existing.length}. Options shuffled for ${added} new question(s).`);
