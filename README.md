# C++ MCQ Bank — Structured Programming

Static single-page web app for practising 180 multiple-choice questions covering the
*Structured Programming with C++* course at **Al-Mustafa University · Department of AI**
(instructor: **Dr. Husam Salah Mahdi**).

Built as plain HTML + CSS + vanilla JS — no framework, no build step. Deployable to
GitHub Pages in one click.

---

## What's inside

| File | Purpose |
| --- | --- |
| `index.html` | App shell + `<template>` blocks for every screen |
| `styles.css` | Theme tokens, layout, dark/light mode |
| `app.js` | Routing, auth, quiz engine, result review |
| `questions.json` | 180 MCQs across 6 chapters (generated) |
| `students.json` | Roster + login credentials (generated) |
| `build_questions.py` | Parses `../MCQ-Question-Bank.md` → `questions.json` |
| `build_students.py` | Parses `../ايميلات الطلبة AI.xlsx` → `students.json` |

---

## Running locally

```bash
cd website
python3 -m http.server 8765
# open http://localhost:8765
```

Sign in with any email/password pair from `students.json`.

---

## Regenerating data

When the question bank or roster changes:

```bash
pip install openpyxl          # for the roster parser
python3 build_questions.py    # rebuilds questions.json
python3 build_students.py     # rebuilds students.json
```

---

## Deploying to GitHub Pages

1. Push the `website/` folder to a public repository (or commit it to an existing
   repo at any path).
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Pick the branch (e.g. `main`) and set the folder to `/website` (or `/` if the
   site lives at the repo root).
5. Save. After ~1 minute the site is live at
   `https://<your-user>.github.io/<repo>/`.

No build step is required — the files served are exactly what you committed.

### Custom domain (optional)
Add a `CNAME` file inside `website/` containing your domain, then point a `CNAME`
DNS record at `<your-user>.github.io`.

---

## Authentication notes

This is a **classroom tool**, not a security product. Credentials are bundled into
`students.json` and matched in the browser. Anyone who downloads the site can read
them. Do not reuse these passwords for anything that matters.

If you need real authentication, swap the client-side check in
`app.js → renderLogin()` for a call to your own backend.

---

## Features

- **Three modes** — Practice (instant feedback), Exam (timed, single-attempt, no feedback), Quick (10 random Qs)
- **Per-chapter or mixed** quizzes
- **Code highlighting** via Prism.js (C++ grammar)
- **Dark / light theme** toggle, persisted to `localStorage`
- **Progress tracking** per chapter (best score)
- **Keyboard shortcuts** — `1-4` pick the Nth visible option, `A-D` pick by canonical letter, arrows to navigate, Enter to advance
- **Result review** with filters (all / wrong / right) and explanations
- **Remember me** sign-in across sessions
- **Resume on refresh** — mid-quiz progress is saved automatically and restored on the home page

### Exam-mode specifics

- **Time limits** — countdown timer, auto-submit at zero. Defaults: 1 min/question for chapter exams, 30 s/question for the full mixed exam, 10 min for quick.
- **Per-student answer order** — option letters A–D are displayed in a different order for each student (deterministic per `email + question id`).
- **Single attempt** — once an exam is submitted on a device, the start button is locked for that quiz/chapter combination.
- **Tab-switch detection** — leaving the tab is logged on the attempt; three switches auto-submits the exam.
- **Copy / right-click / browser-back disabled** — only inside the exam attempt; practice mode is unaffected.

These checks are client-side and easy to bypass with developer tools — they raise the bar for casual cheating but should not be relied on for high-stakes assessment without a backend.

---

## Browser support

Tested on current Chrome, Firefox, and Safari. Requires ES2020+ (`?.`, `??`,
template literals, modules-free script).
