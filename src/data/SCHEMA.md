# Question Schema — `questions.json`

The app reads a single array of analogy questions from `src/data/questions.json`.
Use this schema when generating questions with another tool so they can be **dev-time
merged** into the bank (merge = concatenate + dedup by `id`).

## Question object

| Field                | Type      | Required | Notes |
|----------------------|-----------|----------|-------|
| `id`                 | number    | yes      | Unique integer. Used for dedup and for `solved_question_ids`. |
| `word1`              | string    | yes      | First term of the base analogy (Hebrew). |
| `word2`              | string    | yes      | Second term of the base analogy (Hebrew). |
| `hard_words`         | array     | yes      | May be empty `[]`. If non-empty, a vocabulary preview is shown before the question. |
| `hard_words[].word`  | string    | yes*     | Required for each entry. The difficult word. |
| `hard_words[].definition` | string | yes*   | Required for each entry. Short Hebrew definition. |
| `options`            | array     | yes      | Exactly 4 items. |
| `options[].id`       | number    | yes      | 1–4, unique within the question. |
| `options[].text`     | string    | yes      | Answer pair, formatted `"מילה : מילה"` (space-colon-space). |
| `options[].is_correct` | boolean | yes      | **Exactly one** option must be `true`. |
| `logical_connection` | string    | yes      | The "משפט הקשר" — explains the correct relationship. Shown in the summary for wrong answers. |

## Rules
- `id` must be unique across the whole bank. On merge, an incoming question whose `id`
  already exists is **skipped** (existing one wins) — renumber your ids to avoid collisions.
- Each question must have **exactly one** correct option.
- `options` must contain **4** entries.
- Keep `options[].text` in the `"A : B"` format so it renders consistently.
- Don't worry about where you place the correct option in your source file —
  `options[].id` order doesn't need to be randomized by hand. The merge script
  (`npm run merge-questions`) shuffles every question's options and reassigns
  `options[].id` 1–4, so the correct answer's position is randomized in the
  live bank regardless of authoring order.

## Merging into the live bank
Run `npm run merge-questions` (`scripts/merge-questions.js`) to merge files from
`json_files/` into `src/data/questions.json`. It concatenates + dedups by `id` as
described above, then shuffles options **only for the newly added questions** so
their correct answer isn't skewed toward one position. Questions already in the
bank are left exactly as-is — the script never reshuffles them again, so it's safe
to run mid-testing without changing anything a tester has already seen.

## Minimal example
```json
{
  "id": 101,
  "word1": "קיפאון",
  "word2": "לנוע",
  "hard_words": [
    { "word": "קיפאון", "definition": "מצב של חוסר תנועה או התפתחות" }
  ],
  "options": [
    { "id": 1, "text": "עיוורון : לראות", "is_correct": true },
    { "id": 2, "text": "שתיקה : להקשיב", "is_correct": false },
    { "id": 3, "text": "עייפות : לישון", "is_correct": false },
    { "id": 4, "text": "רעב : לאכול", "is_correct": false }
  ],
  "logical_connection": "המצב שבמילה הראשונה שולל את האפשרות לבצע את הפעולה שבמילה השנייה."
}
```
