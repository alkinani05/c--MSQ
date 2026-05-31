#!/usr/bin/env python3
"""Convert MCQ-Question-Bank.md into questions.json for the web app."""
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

SRC = Path(__file__).resolve().parent.parent / "MCQ-Question-Bank.md"
DST = Path(__file__).resolve().parent / "questions.json"

CHAPTER_RE = re.compile(r"^##\s+Chapter\s+(\d+):\s+(.+?)\s*$")
QUESTION_RE = re.compile(r"^###\s+Q(\d+)\.\s+(.+?)\s*$")
OPTION_RE = re.compile(r"^-\s+([A-D])\)\s+(.+?)\s*$")
ANSWER_RE = re.compile(r"^\*\*Answer:\s+([A-D])\)\s+(.+?)\*\*\s*$", re.DOTALL)


def parse(md_text: str):
    chapters = []
    current_chapter = None
    questions = []

    lines = md_text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]

        # Chapter header
        m = CHAPTER_RE.match(line)
        if m:
            current_chapter = {
                "number": int(m.group(1)),
                "title": m.group(2).strip(),
            }
            chapters.append(current_chapter)
            i += 1
            continue

        # Question header
        m = QUESTION_RE.match(line)
        if m and current_chapter is not None:
            qid = int(m.group(1))
            qtitle = m.group(2).strip()

            # Collect lines until first option or answer
            stem_lines = [qtitle]
            i += 1
            # Read possible code block + extra prose before options
            while i < len(lines):
                ln = lines[i]
                if OPTION_RE.match(ln) or ANSWER_RE.match(ln):
                    break
                if ln.startswith("### ") or ln.startswith("## ") or ln.startswith("---"):
                    break
                stem_lines.append(ln)
                i += 1

            stem = "\n".join(stem_lines).strip()

            # Read options
            options = []
            while i < len(lines):
                ln = lines[i]
                m2 = OPTION_RE.match(ln)
                if m2:
                    options.append({
                        "letter": m2.group(1),
                        "text": m2.group(2).strip(),
                    })
                    i += 1
                elif ln.strip() == "":
                    i += 1
                else:
                    break

            # Read answer (may span multiple lines)
            answer_letter = None
            explanation = ""
            # Find the **Answer line which may be wrapped
            answer_buf = []
            while i < len(lines):
                ln = lines[i]
                if ln.startswith("**Answer:"):
                    answer_buf.append(ln)
                    i += 1
                    # If line ends without closing **, keep reading
                    while answer_buf and not answer_buf[-1].rstrip().endswith("**"):
                        if i >= len(lines):
                            break
                        answer_buf.append(lines[i])
                        i += 1
                    break
                if ln.strip() == "":
                    i += 1
                    continue
                # If we hit something else, abort
                break

            if answer_buf:
                joined = "\n".join(answer_buf)
                m3 = ANSWER_RE.match(joined)
                if m3:
                    answer_letter = m3.group(1)
                    explanation = m3.group(2).strip().rstrip("*").strip()

            questions.append({
                "id": qid,
                "chapter": current_chapter["number"],
                "stem": stem,
                "options": options,
                "answer": answer_letter,
                "explanation": explanation,
            })
            continue

        i += 1

    return chapters, questions


def main():
    if not SRC.exists():
        print(f"ERROR: source file not found: {SRC}", file=sys.stderr)
        sys.exit(1)

    chapters, questions = parse(SRC.read_text(encoding="utf-8"))

    # Quality check
    bad = [q for q in questions if q["answer"] is None or len(q["options"]) != 4]
    if bad:
        print(f"WARNING: {len(bad)} questions failed parsing")
        for q in bad[:5]:
            print(f"  Q{q['id']} chapter={q['chapter']} options={len(q['options'])} answer={q['answer']}")

    # Stable version hash so submissions can record exactly which question set was used.
    # Changing question text → new hash → easy to spot in the results sheet.
    digest = hashlib.sha256(SRC.read_bytes()).hexdigest()[:10]
    built_at = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%MZ")

    payload = {
        "course": "Structured Programming C++",
        "instructor": "Dr. Husam Salah Mahdi",
        "institution": "Al-Mustafa University — Department of AI",
        "version": digest,
        "builtAt": built_at,
        "chapters": chapters,
        "questions": questions,
    }

    DST.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {len(questions)} questions across {len(chapters)} chapters → {DST}")
    print(f"Bank version: {digest}  built: {built_at}")


if __name__ == "__main__":
    main()
