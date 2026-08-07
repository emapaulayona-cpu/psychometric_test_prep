# Pocket Analogies - App Specification (MVP)

## Overview
A personal mobile-first Web Application for Psychometric Exam preparation, focusing strictly on Analogies (אנלוגיות). The app allows the user to practice questions in batches, tracks progress locally, and provides vocabulary assistance.

## Core Flow & Screens

1.  **Home Screen (Dashboard):**
    *   **Progress Ring:** Shows total questions solved out of the total available in the JSON database.
    *   **Stats Row:**
        *   Current Streak (Days practiced in a row).
        *   Average Time per question (global).
    *   **Call to Action:** A prominent button: "התחל תרגול (10 שאלות)".

2.  **Practice Flow (Batch of 10 questions):**
    *   **Vocabulary Preview (Optional Step):** If the current question in the JSON has the `hard_words` field populated, show a screen with the words and their definitions. Pause the timer. Include a button: "הבנתי, למשימה".
    *   **Question Screen:**
        *   Show the base analogy (Word A : Word B).
        *   Start a visible timer (counting up, to measure how long she takes).
        *   Show 4 clickable answer options.
        *   Upon clicking an answer, record the time and correctness, and immediately move to the next question. (No immediate feedback, to simulate exam conditions).

3.  **Summary Screen (End of Batch):**
    *   **Score:** X/10 correct.
    *   **Time Stats:** Total time spent, Average time per question.
    *   **Review Section:** A list of the questions answered in this batch.
        *   Highlight correct answers in green, incorrect in red.
        *   For mistakes, display the `logical_connection` (משפט הקשר) from the JSON to explain the correct answer.
    *   **Call to Action:** "חזרה למסך הראשי" or "תרגול נוסף".

## Data Structure (JSON)
The app will read from a local file `src/data/questions.json`. Structure example:
```json
[
  {
    "id": 1,
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
    "logical_connection": "מצב של A הוא מצב שלא מאפשר B (מי שנמצא בקיפאון לא יכול לנוע, כפי שמי שנמצא בעיוורון לא יכול לראות)."
  }
]
```

## State Management (User Data)
*   No backend required for user state.
*   Use browser `localStorage` to save:
    *   `solved_question_ids`: Array of IDs already solved (so they don't repeat until the DB is exhausted).
    *   `last_practice_date`: To calculate the daily streak.
    *   `current_streak`: Number of consecutive days.
    *   `total_time_spent` and `total_questions_answered`: For global averages.