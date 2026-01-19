# Master's Final Exam Notes - Application Specification

## Overview

A static website built with Astro and MDX for publishing Computer Science master's final state exam notes. The site will be deployed to GitHub Pages.

**Repository:** dominikandrewtichy.github.io
**Base path:** /final-exam-notes

---

## Content Structure

### Organization
- **11 topic pages** - One comprehensive page per exam topic question
- **Flat hierarchy** - All topics at the same level, no nested sub-pages
- **Content format** - MDX files with support for:
  - Plain text and standard markdown formatting
  - Code blocks with syntax highlighting
  - Inter-note linking (wiki-style `[[link]]` or standard markdown links between topics)

### Content Location
```
src/
  content/
    topics/
      topic-01.mdx
      topic-02.mdx
      ...
      topic-11.mdx
```

### Frontmatter Schema
Each topic file should include:
```yaml
---
title: "Topic Question Title"
description: "Brief description of the topic"
order: 1  # 1-11, for sidebar ordering
tags: ["tag1", "tag2"]  # optional, for filtering
lastUpdated: 2024-01-19  # auto-updated or manual
---
```

---

## Design & Layout

### Visual Style
- **Minimal/clean** - Distraction-free reading experience
- **Color scheme** - Black and white base (customizable via CSS variables)
- **Typography** - Clean, readable fonts suitable for technical content

### Styling Approach
- **Tailwind CSS** with CSS variables for theming
- Variables defined in `global.css`, referenced in `tailwind.config.mjs`

### Color System (CSS Variables)
```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: 255 255 255;          /* #ffffff */
  --color-bg-secondary: 245 245 245; /* #f5f5f5 */
  --color-text: 0 0 0;               /* #000000 */
  --color-text-secondary: 102 102 102; /* #666666 */
  --color-accent: 0 0 0;             /* #000000 */
  --color-border: 224 224 224;       /* #e0e0e0 */
  --color-code-bg: 245 245 245;      /* #f5f5f5 */
}

.dark {
  --color-bg: 0 0 0;                 /* #000000 */
  --color-bg-secondary: 17 17 17;    /* #111111 */
  --color-text: 255 255 255;         /* #ffffff */
  --color-text-secondary: 153 153 153; /* #999999 */
  --color-accent: 255 255 255;       /* #ffffff */
  --color-border: 51 51 51;          /* #333333 */
  --color-code-bg: 17 17 17;         /* #111111 */
}
```

### Tailwind Config
```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        'bg-secondary': 'rgb(var(--color-bg-secondary) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'code-bg': 'rgb(var(--color-code-bg) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
```

### Theme
- **Dark mode toggle** - User can switch between light and dark themes
- **Persistence** - Theme preference saved to localStorage
- **Default** - Respect system preference on first visit

---

## Layout Structure

### Desktop Layout
```
+------------------+--------------------------------+
|     Header       |                                |
+------------------+--------------------------------+
|                  |                                |
|    Sidebar       |         Main Content           |
|    (Topics)      |                                |
|                  |         +---------------+      |
|    - Topic 1     |         |  Table of     |      |
|    - Topic 2     |         |  Contents     |      |
|    - ...         |         +---------------+      |
|    - Topic 11    |                                |
|                  |                                |
+------------------+--------------------------------+
```

### Components

#### Header
- Site title/logo (links to homepage)
- Dark mode toggle button
- Search button/trigger

#### Sidebar (Desktop)
- Always visible on desktop
- Lists all 11 topic questions
- Shows current topic as active
- Sticky positioning (follows scroll)

#### Sidebar (Mobile)
- Hidden by default
- Hamburger menu button in header
- Slides in from left as overlay
- Close button or tap-outside to dismiss

#### Main Content Area
- Topic title (h1)
- Last updated date
- Tags display
- Article content
- Table of contents (floating/sticky on right side for long content)

#### Table of Contents
- Auto-generated from h2/h3 headings
- Highlights current section on scroll
- Collapsible on mobile

---

## Navigation & Discovery

### Primary Navigation
- Sidebar with all 11 topics (always accessible)
- Homepage with complete topic list

### Search
- Client-side full-text search across all notes
- Search modal/overlay triggered by button or keyboard shortcut (Ctrl/Cmd + K)
- Pagefind or similar static search solution

### Tags/Categories
- Optional tags on each topic
- Tag filtering on homepage or dedicated tags page
- Visual tag chips on topic pages

### Inter-note Linking
- Support for linking between topics
- Standard markdown links: `[Topic 2](/final-exam-notes/topics/topic-02)`
- Consider adding backlinks display (optional enhancement)

---

## Pages

### Homepage (`/`)
- Site title and brief description
- Simple list of all 11 topic questions with links
- Each item shows: topic number, title, optional tags
- Clean, scannable layout

### Topic Page (`/topics/[slug]`)
- Full topic content rendered from MDX
- Sidebar navigation visible
- Table of contents for the page
- Tags display
- Last updated timestamp

### 404 Page
- Simple not found message
- Link back to homepage

---

## Technical Requirements

### Stack
- **Framework:** Astro 5.x
- **Content:** MDX with @astrojs/mdx integration
- **Styling:** Tailwind CSS with @astrojs/tailwind integration
- **Deployment:** GitHub Pages via GitHub Actions

### Performance
- Static site generation (SSG)
- Minimal JavaScript (only for interactivity: theme toggle, search, mobile menu)

### Code Blocks
- Syntax highlighting via Astro's built-in Shiki
- Support for common programming languages
- Copy button on code blocks (nice-to-have)

---

## File Structure

```
masters-notes/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment
├── public/
│   └── favicon.svg             # Site favicon
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Sidebar.astro
│   │   ├── ThemeToggle.astro
│   │   ├── TableOfContents.astro
│   │   ├── Search.astro
│   │   ├── TagList.astro
│   │   └── MobileMenu.astro
│   ├── content/
│   │   ├── config.ts           # Content collection config
│   │   └── topics/
│   │       ├── topic-01.mdx
│   │       ├── topic-02.mdx
│   │       └── ...
│   ├── layouts/
│   │   ├── BaseLayout.astro    # HTML shell, head, theme
│   │   └── TopicLayout.astro   # Layout for topic pages
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── topics/
│   │   │   └── [...slug].astro # Dynamic topic pages
│   │   └── 404.astro
│   └── styles/
│       └── global.css          # Tailwind directives + CSS variables
├── astro.config.mjs
├── tailwind.config.mjs         # Tailwind configuration
├── package.json
├── tsconfig.json
└── specs/
    └── requirements.md         # This file
```

---

## Future Enhancements (Out of Scope)

The following are not part of the initial implementation but could be added later:

- Progress tracking (mark topics as complete)
- Print-friendly styles
- PDF export
- Comments/annotations
- Backlinks display
- Reading time estimates
- Related topics suggestions

---

## Summary

| Feature | Implementation |
|---------|---------------|
| Content format | MDX files in content collection |
| Topics | 11 pages, one per exam question |
| Navigation | Persistent sidebar + homepage list |
| Search | Client-side (Pagefind) |
| Tags | Optional per-topic, filterable |
| TOC | Auto-generated per page |
| Theme | Light/dark with toggle |
| Mobile | Hamburger menu for sidebar |
| Styling | Tailwind CSS + CSS variables |
| Deployment | GitHub Pages |
