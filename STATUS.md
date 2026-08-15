# Status — פציחומטרי (formerly אנלוגיות כיס / Pocket Analogies)

_Last updated: 2026-08-15_

Mobile-first, RTL Hebrew web app to help prepare for the Israeli Psychometric
Entrance Test (פסיכומטרי). MVP scope = the **Analogies (אנלוגיות)** section.

## State: MVP live

- **Deployed:** yes — pushed to GitHub `main`, auto-deployed on Vercel.
- **Repo:** https://github.com/emapaulayona-cpu/psychometric_test_prep
- **Bank size:** 148 analogy questions.
- **Verified:** production build passes; question bank validated (each item has 4
  options, exactly one correct, and no vocab hint that leaks the answer).

## What works

- Home dashboard: progress ring (solved / total), daily streak, average time.
- Practice flow: optional vocabulary preview (hard words) → analogy question with
  count-up timer → per-answer feedback (green = correct, red = wrong; she may keep
  trying, but the score counts only the first attempt).
- Explanation of the logical connection shown on a wrong answer.
- Summary screen: score, total + average time, per-question review with the
  logical connection on misses.
- Progress persists in the browser (localStorage). Batches of 10; when the whole
  bank is solved, the pool resets so practice can start over.

## Tech

Vite + React + Tailwind CSS + Lucide. Fully client-side (local JSON bank +
localStorage). No backend. RTL configured globally.

## Recent changes

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

1. **Keep enriching the question bank** with more analogies calibrated to real
   psychometric difficulty. Note: official exam items are copyrighted — we author
   original questions in the same style, using public examples only as a reference
   for relationship types and difficulty.
2. Optional: review any items that still feel too easy in practice and harden them.
3. Future sections beyond Analogies (deferred), and a persistent pocket dictionary
   (deferred).

## How questions get added

The user authors question files with a separate tool and drops JSON into
`json_files/`. Run `npm run merge-questions` to merge them into
`src/data/questions.json` — it dedups by id and shuffles options for newly added
questions only (see `src/data/SCHEMA.md`). Still do by hand before merging: drop
duplicate analogies, strip any vocab hint that also appears in an answer option,
and re-check that no distractor is a second valid answer.
