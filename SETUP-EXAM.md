# Setting up real-exam mode (Google Sheets webhook)

This is the one-time setup the instructor performs to collect exam submissions. The site stays on GitHub Pages; results land in a Google Sheet you own. Free, no servers, no API keys.

## Result — what students will see

When a student finishes an **exam-mode** quiz, the site posts their answers to the script you set up here. They see a **submission receipt code** they can show you as proof. If your script is unreachable (network outage, you forgot to deploy), they get a fallback screen with a JSON blob they can email to you — no answer is ever lost.

## Result — what you will see

Each submission becomes one row in your Google Sheet. Columns include the student's name, email, quiz title, score, time taken, tab-switch count (cheat flag), bank version, and per-question answers. Sort, filter, and export to xlsx natively.

---

## Step 1 — Create the Google Sheet

1. Open https://sheets.google.com and create a new blank spreadsheet.
2. Rename it to something like `C++ MCQ — Exam Submissions`.
3. In the **first** sheet tab, leave row 1 empty for now — the script will write the header row on the first submission.

## Step 2 — Open the Apps Script editor

In the Sheet, click **Extensions → Apps Script**. A new browser tab opens with `Code.gs` and a stub `myFunction`.

Replace the entire contents of `Code.gs` with the script below.

```javascript
// C++ MCQ — exam submission webhook.
// Bound to the Google Sheet via Extensions → Apps Script.
// Accepts POSTs from the static site, dedupes by (userEmail × quizKey × examKey),
// appends one row per submission, returns a receipt code.

const HEADERS = [
  'submittedAt', 'receipt',
  'userId', 'userName', 'userEmail',
  'examKey', 'bankVersion', 'quizKey', 'title', 'scope', 'chapter',
  'score_pct', 'score_correct', 'score_wrong', 'score_skipped', 'score_total',
  'startedAt', 'elapsedSec', 'finishReason',
  'tabSwitches', 'copyAttempts',
  'answersJson',
];

function doPost(e) {
  const out = (obj) => ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return out({ ok: false, error: 'bad-json' });
  }

  // Required fields
  for (const f of ['userEmail', 'quizKey', 'score', 'answers']) {
    if (data[f] == null) return out({ ok: false, error: 'missing-' + f });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    // Ensure header row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    // Dedupe: (userEmail × quizKey × examKey)
    const last = sheet.getLastRow();
    if (last > 1) {
      const range = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
      const emailCol = HEADERS.indexOf('userEmail');
      const examCol  = HEADERS.indexOf('examKey');
      const quizCol  = HEADERS.indexOf('quizKey');
      const dup = range.some(row =>
        row[emailCol] === data.userEmail &&
        row[examCol]  === (data.examKey || '') &&
        row[quizCol]  === data.quizKey
      );
      if (dup) return out({ ok: false, error: 'duplicate' });
    }

    const receipt = makeReceipt();
    sheet.appendRow([
      new Date(), receipt,
      data.userId || '', data.userName || '', data.userEmail,
      data.examKey || '', data.bankVersion || '', data.quizKey,
      data.title || '', data.scope || '', data.chapter || '',
      data.score.pct, data.score.correct, data.score.wrong, data.score.skipped, data.score.total,
      data.startedAt || '', data.elapsedSec || 0, data.finishReason || '',
      (data.flags || {}).tabSwitches || 0, (data.flags || {}).copyAttempts || 0,
      JSON.stringify(data.answers),
    ]);

    return out({ ok: true, receipt: receipt });
  } finally {
    lock.releaseLock();
  }
}

function makeReceipt() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';   // skip I, O
  const digits  = '23456789';                   // skip 0, 1
  let s = '';
  for (let i = 0; i < 4; i++) s += letters[Math.floor(Math.random() * letters.length)];
  s += '-';
  for (let i = 0; i < 4; i++) s += digits[Math.floor(Math.random() * digits.length)];
  return s;
}
```

Save the file (Ctrl+S / Cmd+S).

## Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment** (top right).
2. Click the gear icon next to "Select type" and pick **Web app**.
3. Fill in:
   - **Description:** `MCQ submission webhook v1`
   - **Execute as:** **Me** (your account)
   - **Who has access:** **Anyone** *(this is required for the static site to call it without a Google login — students must NOT need to sign in to Google. The endpoint only writes to your sheet; nobody else can read it.)*
4. Click **Deploy**.
5. Google asks you to authorize the script (it needs permission to write to your sheet). Click through the warnings — pick your account, click **Advanced → Go to (script name) (unsafe) → Allow**. You're authorizing your own script to use your own sheet; this is normal.
6. Copy the **Web app URL** at the end. It looks like `https://script.google.com/macros/s/AKfycb.../exec`.

## Step 4 — Paste the URL into `website/config.json`

Open `website/config.json` in this repo and replace the empty `submitUrl`:

```json
{
    "submitUrl": "https://script.google.com/macros/s/PASTE_HERE/exec",
    "examKey": "midterm-2026",
    "examWindow": {
        "open": "",
        "close": ""
    }
}
```

- `examKey` — change to identify each different exam (e.g. `final-2026`, `quiz-ch3-2026`). Submissions are deduped per `(userEmail × quizKey × examKey)`, so changing this lets the same student attempt a brand-new exam.
- `examWindow.open` / `examWindow.close` — optional ISO timestamps. Outside this window, exam-mode start buttons are hidden. Leave empty to allow attempts any time. Example: `"2026-05-14T10:00:00+03:00"`.

Commit and push, GitHub Pages auto-rebuilds in about a minute.

## Step 5 — Test it

1. Open the deployed site, sign in as any student from `students.json`.
2. Pick **Exam** mode, start any chapter exam.
3. Answer a couple of questions, click **Finish**.
4. You should see a *Submission received* dialog with a receipt code.
5. Open the Sheet — one row should be there.
6. Try submitting the **same** student × same chapter again — you should see *Already submitted*. (To allow a re-attempt, delete that row from the sheet.)

## Updating the script later

If you change `Code.gs`, you must **Deploy → Manage deployments → ✏️ pencil icon → Version: New version → Deploy**. Otherwise the existing Web app URL keeps running the old code.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Frontend shows *Couldn't reach the server* | Wrong URL, or "Who has access" not set to *Anyone* | Re-deploy with **Anyone** access; copy the new URL |
| All submissions logged as `ok:false, missing-X` | Frontend version older than this README | Pull the latest `app.js`; clear browser cache |
| Two rows from the same student | Two different `examKey` values across deploys | Pick one `examKey` per exam and stick with it |
| Sheet row times look wrong | Apps Script uses your account timezone | In Apps Script editor: **Project Settings → Time zone** |

## Privacy notes

- The webhook URL is in `config.json` and visible to anyone who downloads the site. That's fine — the URL only lets people *write* a submission row; it cannot read other rows.
- You should still rotate the URL between semesters by re-deploying as a new version (or new deployment) and updating `config.json`. This invalidates any leaked URL from a prior cohort.
- Tab-switch and copy-attempt counts are recorded as part of the submission. Use them as flags, not proof — a determined cheater can patch these out client-side.
