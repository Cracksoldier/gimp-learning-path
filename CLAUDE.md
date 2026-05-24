# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A self-contained single-page web application — `index.html` is the entire project. No build step, no dependencies, no package manager. Open the file directly in any browser.

## Architecture

Everything lives in one file with three embedded sections:

**`<style>`** — All CSS using custom properties defined on `:root`. Level colors (`--beginner`, `--intermediate`, `--advanced`, `--expert`), progress bar colors (`--bar-lessons`, `--bar-challenges`), and surface/text tokens drive the entire visual theme. Responsive breakpoints at 768px (mobile) and 1024px (tablet).

**Static data (`LEARNING_PATH` constant)** — An array of 4 section objects, each with `lessons[]` and `challenges[]`. IDs follow the convention `{section}-{n}` for lessons and `{section}-c{n}` for challenges (e.g. `beginner-1`, `intermediate-c2`). This is the only place to add/edit learning content.

**JavaScript** — Vanilla ES6, no framework. Key separation:
- `loadState` / `saveState` — localStorage under key `gimp-lp-v1`; state shape: `{ version, lessons: {id: bool}, challenges: {id: bool} }`
- `render()` — builds full HTML via string concatenation and sets `innerHTML` once on init
- `handleLessonToggle` / `handleChallengeToggle` — fast-path DOM updates (toggle CSS class, update counts) without re-rendering
- `renderProgressBars()` — sets bar `style.width` directly; CSS `transition` handles animation
- `exportJSON` / `handleImport` — Blob download and FileReader-based import with schema validation

## Making changes

**Add a lesson or challenge:** Edit the `LEARNING_PATH` constant. Lessons need `{ id, title, psEquivalent, description, concepts[] }`; challenges need `{ id, title, difficulty, description, goal }`. Valid difficulty values: `'Easy'`, `'Medium'`, `'Hard'`, `'Expert'`.

**Change colors/theme:** Edit CSS custom properties in `:root`.

**Verify locally:** Open `index.html` in a browser. For automated checks, use Playwright with the system Chromium (`/usr/bin/chromium`) and `--no-sandbox`.

## Constraints

- No external JS dependencies — the file must work offline (Google Fonts CDN failure is acceptable; layout uses `system-ui` fallback).
- `file://` protocol compatibility required — no ES modules, no fetch calls, no relative imports.
- localStorage is the only persistence mechanism; there is no backend.
