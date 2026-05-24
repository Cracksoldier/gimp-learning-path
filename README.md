# GIMP Learning Path

A structured, self-contained guide for Photoshop users switching to GIMP — beginner to expert. Every lesson maps a Photoshop workflow to its GIMP equivalent. No server, no dependencies, no installation.

**[Open `index.html` in any browser to use it.](index.html)**

---

## Features

- **55 items** — 36 lessons and 19 challenges across 4 levels (Beginner → Intermediate → Advanced → Expert)
- **Photoshop mapping** — every lesson shows the PS equivalent so you always know where you are
- **Estimated time** — each item carries a time estimate (10 min to 3–4 hrs)
- **Progress tracking** — separate progress bars for lessons and challenges; animated SVG rings per section
- **Challenge notes** — collapsible per-challenge text area, persisted in localStorage
- **Mark all / Clear all** — bulk-complete or clear an entire section's lessons or challenges
- **Search** — live full-text search across all cards
- **Filters** — All · Uncompleted · Lessons · Challenges · Beginner · Intermediate · Advanced · Expert
- **Keyboard navigation** — `j`/`k` or `↓`/`↑` to move between cards, `Space` to toggle, `/` to focus search, `?` for help, `Esc` to close/clear
- **Jump to next** — `→ Next` button scrolls to the first uncompleted visible item
- **Theme** — dark (default) and light, persisted across sessions
- **Import / Export** — save and restore progress as JSON
- **Share** — copies a URL with your full progress encoded in the hash; open it in any browser to restore state
- **Print / PDF** — clean checklist layout, sidebar and controls hidden, page break per section

---

## Usage

Download or clone, then open `index.html` directly in your browser — no web server needed.

```
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Progress is stored in `localStorage` under the key `gimp-lp-v2`. Use **Export** to back it up as JSON before clearing browser data.

### Keyboard shortcuts

| Key | Action |
|-----|--------|
| `j` / `↓` | Next card |
| `k` / `↑` | Previous card |
| `Space` | Toggle focused card |
| `/` | Focus search |
| `?` | Show shortcut hint |
| `Esc` | Close modal / clear search |

---

## Building from source

The distributable `index.html` is assembled from four source files:

```
src/
  template.html   HTML shell
  style.css       All CSS
  data.js         LEARNING_PATH constant (all lessons and challenges)
  app.js          All JavaScript
build.js          Node.js bundler (no npm deps)
```

```bash
node build.js
# Built index.html (N bytes)
```

Requires Node.js. The build script has no third-party dependencies.

### Adding content

Edit `src/data.js`. Lesson shape:

```js
{
  id: 'intermediate-11',  // {section}-{n}
  est: '20 min',
  title: 'Your lesson title',
  psEquivalent: 'PS Feature Name',
  description: 'Explanation paragraph.',
  concepts: ['Key concept', 'Another concept']
}
```

Challenge shape:

```js
{
  id: 'intermediate-c7',  // {section}-c{n}
  difficulty: 'Medium',   // Easy | Medium | Hard | Expert
  est: '45 min',
  title: 'Challenge title',
  description: 'What to do.',
  goal: 'Definition of done.'
}
```

Run `node build.js` after editing, then reload `index.html`.

---

## Content overview

| Level | Lessons | Challenges | Topics |
|-------|---------|------------|--------|
| Beginner | 8 | 4 | Interface, tools, layers, file formats, color, undo |
| Intermediate | 10 | 6 | Blend modes, curves, paths, text, filters, channels, RAW workflow, Inkscape |
| Advanced | 10 | 5 | Script-Fu, batch processing, GEGL, Python-Fu, plugins, QuickMask, GIMP 3 live effects |
| Expert | 8 | 4 | ICC color management, custom brushes/patterns, luminosity masking, frequency separation, HDR |
