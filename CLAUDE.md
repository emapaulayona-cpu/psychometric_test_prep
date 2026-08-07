# Claude Code System Instructions

You are building a React Web Application based on the `SPEC.md` file.

## Tech Stack
*   **Framework:** React (Next.js or Vite are acceptable, optimize for Vercel deployment).
*   **Styling:** Tailwind CSS.
*   **Icons:** Lucide React.
*   **Database:** Local JSON file (no external API or backend).

## Design & UI Guidelines
*   **Mobile-First:** The UI must look like a native mobile app. Use a centered, max-width container (e.g., `max-w-md mx-auto`) for desktop viewing, with a clean background.
*   **RTL Support:** **CRITICAL!** The app is entirely in Hebrew. You must configure Tailwind and HTML structure for Right-to-Left (`dir="rtl"`). All text alignments, margins, and paddings must support RTL (e.g., use `ms-` and `me-` instead of `ml-` and `mr-`).
*   **Color Palette:** Clean, focus-oriented. Use soft greens for success/progress, calm grays for secondary elements, and soft reds for errors. (Reference a Gamified learning app aesthetic).
*   **Interactivity:** Smooth transitions between questions. No page reloads.

## Development Steps
1.  Initialize the project structure and install Tailwind.
2.  Set up the global RTL layout.
3.  Create the `src/data/questions.json` file with dummy data matching the SPEC.
4.  Build the State Management hooks (reading/writing to `localStorage`).
5.  Build the Home Component (Dashboard).
6.  Build the Practice Component (Vocabulary Preview -> Question Timer -> Next).
7.  Build the Summary Component.
8.  Ensure all components are connected and the flow works perfectly.