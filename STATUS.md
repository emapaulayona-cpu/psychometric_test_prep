# Status — פציחומטרי (formerly אנלוגיות כיס / Pocket Analogies)

_Last updated: 2026-08-20_

Mobile-first, RTL Hebrew web app to help prepare for the Israeli Psychometric
Entrance Test (פסיכומטרי). Two sections live: **Analogies (אנלוגיות)** and
**English (אנגלית — sentence completion)**.

## State: MVP live, multi-section

- **Deployed:** yes — pushed to GitHub `main`, auto-deployed on Vercel.
- **Repo:** https://github.com/emapaulayona-cpu/psychometric_test_prep
- **Bank sizes:** 184 analogy questions, 25 English sentence-completion questions.
- **Verified:** production build passes; both banks validated (schema-checked,
  each item has exactly one correct option, no vocab hint that leaks the answer).

## What works

- Section-select screen: pick Analogies or English, each with its own progress
  ring, streak, and average time (tracked independently in localStorage — see
  `src/data/sections.js`, the registry a future third section would extend).
- Home dashboard per section: progress ring (solved / total), daily streak,
  average time.
- Practice flow: question with count-up timer → per-answer feedback (green =
  correct, red = wrong; she may keep trying, but the score counts only the first
  attempt) → hard-word vocab shown on the feedback screen (after answering, never
  before — avoids hinting the answer).
- Explanation shown on a wrong answer (`logical_connection` for analogies,
  `explanation` for English).
- Summary screen: score, total + average time, per-question review.
- Progress persists in the browser (localStorage), namespaced per section.
  Batches of 10; when a section's whole bank is solved, its pool resets so
  practice can start over.

## Tech

Vite + React + Tailwind CSS + Lucide. Fully client-side (local JSON banks +
localStorage). No backend. RTL configured globally; English content renders
LTR inline (sentences, options, hard words) inside the RTL shell.

## Recent changes

- Added the **English (אנגלית)** section: sentence-completion questions (the
  real psychometric English-section format — English sentence with a blank, 4
  English word options). Authored 25 original questions calibrated against a
  CAMPUS word-frequency/difficulty list (level 1-10) the user provided — not
  copied from her copyrighted prep book, which was used only as a style/format
  reference (that book's own Sentence Completion section has no answer key in
  the available pages, so it couldn't be used directly anyway). Schema:
  `src/data/SCHEMA_ENGLISH.md` / `src/data/english_questions.json`.
- Generalized the app for multiple sections: `useProgress` now takes a
  `sectionId` to namespace localStorage keys, `Practice`/`Question` split into a
  shared `useQuestionAttempt` hook + a per-section question component
  (`Question.jsx` for analogies, `EnglishQuestion.jsx` for English), `Summary`
  takes per-section render helpers instead of hardcoded field names, and a new
  `SectionSelect` screen sits in front of the existing per-section Home.
- Added 36 analogy questions from `questions_file7.json` / `questions_file8.json`
  (bank 148 → 184, new ids 149-184). Before merging: renumbered the source files'
  ids (they collided with the existing 1-148 range), dropped 4 questions —
  one duplicated an existing base word-pair (`כליל : פגם`, already id 31), and
  three had a distractor that was arguably a second valid answer — and fixed a
  vocab-hint leak where a hard-word definition contained the correct answer's
  first word.
- Renamed the app from אנלוגיות כיס to **פציחומטרי** (a portmanteau of פיצוח +
  פסיכומטרי). Updated in the browser tab title and the home screen header.
- Added 20 new analogy questions (ids 129-148, bank 128 → 148). Fixed two content
  issues found during review before merging: a correct-answer pair duplicated
  across two questions, and a distractor that was ambiguously close to correct.
- Fixed a correct-answer position bias (found by Mia while testing): the correct
  option was answer #1 in 62% of questions. Added `scripts/merge-questions.js`
  (`npm run merge-questions`), which merges new files from `json_files/` and
  shuffles options **only for newly added questions** — existing questions are
  left untouched so re-running it doesn't disturb questions a tester has already
  seen. Reshuffled the original 128 once; position distribution is now roughly
  even (~25% each) and stays that way as new batches are merged.
- Removed vocabulary hints that appeared inside an answer option (they telegraphed
  the correct pair).
- Hardened a few weak distractors and fixed two content bugs in question 68.

## Next steps

1. **Keep enriching both question banks** — more analogies, and more English
   sentence-completion questions (currently only 25; 2-3 more batches of ~20-25
   would round it out). Note: official exam items and copyrighted prep-book
   content — use only as a style/difficulty reference, author original questions.
2. Optional: review any items that still feel too easy in practice and harden them.
3. A third section (e.g. Reading Comprehension) would slot into the existing
   `SECTIONS` registry (`src/data/sections.js`) without touching
   App/Home/Summary/useProgress — see that file's header comment.
4. A persistent pocket dictionary (deferred).

## How questions get added

The user authors question files with a separate tool and drops JSON into
`json_files/`. Run `npm run merge-questions` to merge them into
`src/data/questions.json` — it dedups by id and shuffles options for newly added
questions only (see `src/data/SCHEMA.md`). Still do by hand before merging: drop
duplicate analogies, strip any vocab hint that also appears in an answer option,
and re-check that no distractor is a second valid answer.
