# React All Concepts

An interactive reference for core React concepts — one topic per page, each with a
short and long explanation, five runnable/editable code examples, and a personal
note you can save per example. Notes and your explanation-mode preference are
persisted in the browser via `localStorage`.

## Features

- **Topics** — useState, useEffect, useContext, useReducer, useRef, useMemo &
  useCallback, Custom Hooks, and Props & Composition.
- **Short / Long explanation toggle** per topic, remembered per topic.
- **5 runnable examples per topic** — switch between them with the example tabs.
- **Live code runner** — edit the code in-place and re-run it, or reset back to
  the original example.
- **Notes** — add, edit, and save a note per example; notes persist locally and
  show a dot indicator on the example tab once saved.

## Tech stack

- React 19 + TypeScript
- Vite
- React Router (client-side routing per topic)
- `react-live` (in-browser code editor + evaluator for the runnable examples)
- CSS Modules, organized with atomic design (`atoms` → `molecules` → `organisms`
  → `templates` → `pages`)
- `localStorage` for persisting notes and UI preferences

## Project structure

```
src/
  types/            Shared TypeScript types (Topic, Example, Note, ...)
  utils/            Small storage helpers
  hooks/            useLocalStorage, useNotes
  data/topics/      Topic content: explanations + example source code
  components/
    atoms/          Button, Badge, IconButton, ToggleSwitch, TextArea, Spinner
    molecules/      ModeToggle, ExampleTabs, NoteEditor, CodeRunner, SearchBox, TopicNavItem
    organisms/      Sidebar, Navbar, ExplanationPanel, ExampleViewer
    templates/       MainLayout
  pages/            HomePage, TopicPage, NotFoundPage
  router/           AppRouter
```

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build      # type-check and build for production
npm run preview    # preview the production build
npm run lint       # lint with oxlint
```
