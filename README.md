# UniPrep - Interactive Exam Platform

A lightweight, Next.js-based interactive practice site for university modules. It runs entirely locally using JSON files as a database.

## 🚀 Quick Start

1.  **Clone or Create Project:**
    If you are generating this:
    ```bash
    npx create-next-app@latest my-app --ts --src-dir --tailwind --eslint
    cd my-app
    # (Copy the provided files into the structure)
    npm install lucide-react clsx tailwind-merge
    npm install -D vitest jsdom @testing-library/react @vitejs/plugin-react
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 How to Add Data

No database setup required. Everything is in `src/data`.

### Adding a New Course (MK)
1. Create a folder in `src/data/` with the MK Code (e.g., `src/data/MATA4101`).
2. Create a `meta.json` file inside that folder:
    ```json
    {
      "code": "MATA4101",
      "title": "Calculus I",
      "description": "Basic calculus.",
      "modules": [
        { "id": "modul1", "title": "Functions" }
      ]
    }
    ```

### Adding Questions (Module)
1. Create a JSON file in the course folder matching the module ID (e.g., `modul1.json`).
2. Schema:
    ```json
    {
      "id": "modul1",
      "title": "Functions",
      "questions": [
        {
          "id": "q1",
          "question": "What is 2+2?",
          "options": ["3", "4", "5"],
          "correctIndex": 1,
          "explanation": "Math.",
          "difficulty": "easy"
        }
      ]
    }
    ```

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Data:** Local JSON (Server Components)

## 🏗 Architecture Notes

- **SRP:** Data fetching is isolated in `lib/data.ts`. UI components are dumb (display only) where possible.
- **Client/Server:** We use Server Components for pages to read JSON files, and Client Components (`ExamClient`) only for the interactive exam session.
- **Migration Path:** To switch to a real DB, update `src/lib/data.ts` to fetch from an API or Prisma/Supabase instead of `fs`. The rest of the app will remain unchanged.