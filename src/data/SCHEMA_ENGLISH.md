# Question Schema — `english_questions.json`

English sentence-completion questions (matches the psychometric English section
format): an English sentence with a blank, 4 English word options.

## Question object

| Field                | Type      | Required | Notes |
|----------------------|-----------|----------|-------|
| `id`                 | number    | yes      | Unique integer within this bank. Separate id space from `questions.json`. |
| `level`               | number    | yes      | Difficulty tier 1-10, for calibrating new questions against the CAMPUS word-frequency list. Not shown in the UI. |
| `sentence`            | string    | yes      | English sentence containing exactly one blank, written as `______` (6 underscores). |
| `hard_words`         | array     | yes      | Exactly 1 entry: `{ word, definition }` for the **correct** option's word, with a short Hebrew definition. Shown on the feedback screen after answering — never before (would hint the answer). |
| `options`            | array     | yes      | Exactly 4 items, all the same part of speech. |
| `options[].id`       | number    | yes      | 1–4, unique within the question. |
| `options[].text`     | string    | yes      | A single English word (or short phrase). |
| `options[].is_correct` | boolean | yes      | **Exactly one** option must be `true`. |
| `explanation`         | string    | yes      | Hebrew rationale: what the correct word means and why each distractor doesn't fit. Shown on a wrong answer (same pattern as `logical_connection` in the analogies bank). |

## Rules
- `id` must be unique within this bank (ids in `questions.json` are a separate space — no need to avoid collisions across banks).
- Exactly one correct option; all 4 options must be the same part of speech so the
  question tests vocabulary meaning, not grammar.
- `hard_words[0].word` must exactly match the correct option's `text`.
- Author original sentences — do not copy sentences from copyrighted prep books.
  Use word-frequency/difficulty lists only as a reference for picking a target word
  at the right level.
- Every question must have exactly one defensible correct answer — double-check
  distractors aren't also contextually valid before adding a question.

## Minimal example
```json
{
  "id": 1,
  "level": 5,
  "sentence": "The committee could not reach a(n) ______ decision because its members held very different opinions.",
  "hard_words": [
    { "word": "unanimous", "definition": "פה אחד, בהסכמה מלאה של כל המשתתפים" }
  ],
  "options": [
    { "id": 1, "text": "fragmented", "is_correct": false },
    { "id": 2, "text": "unanimous", "is_correct": true },
    { "id": 3, "text": "arbitrary", "is_correct": false },
    { "id": 4, "text": "transient", "is_correct": false }
  ],
  "explanation": "unanimous פירושה החלטה שכולם מסכימים לה..."
}
```
