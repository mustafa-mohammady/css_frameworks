# Reading List

A reading list built with React 19, TypeScript and Vite. No backend, the data is kept in `localStorage`. Read `SPEC.md` before you build anything.

## Commands

- `npm run dev`: start the app on http://localhost:3000
- `npm run test:run`: run the tests once
- `npm run check`: check the types
- `npm run build`: build the app

## Rules

- **Do not change** `src/useBooks.ts`, `src/books.ts`, `src/types.ts` or `src/seed.json`. They are tested and shared between all versions of the app. Only build the view layer.
- Use function components and hooks. No class components.
- No `any`. Type props explicitly.
- Keep components small. One component per file in `src/components`.
- Run `npm run check` and `npm run test:run` before you say a task is done.

## Styling

Approach: **Tailwind CSS v4** (via `@tailwindcss/vite`).

- Use Tailwind CSS v4 only. No `tailwind.config.js`, configure with `@theme` in `src/index.css`.
- **Design tokens** live in `tokens/tokens.json` (shared with the Bootstrap version). Change values only there, then run `npm run tokens` to regenerate `tokens/tokens.css` and `tokens/_tokens.scss`. Never edit the generated files.
- Colors come only from the semantic tokens mapped in `@theme` (`bg-primary`, `text-muted`, `border-border`, `bg-done-bg`, ...). No raw palette classes (`bg-blue-600`) in components, no hex colors.
- Spacing comes only from the shared token scale `0` to `5` (`p-3`, `gap-2`, `mb-4`; same steps as Bootstrap: 0, 0.25, 0.5, 1, 1.5, 3 rem). Tailwind's default scale is switched off. No arbitrary values (`p-[13px]`, `bg-[#123456]`).
- No inline `style` props, no other CSS libraries, no `@apply` in components.
- Reuse components. Do not repeat long class lists, extract a component (`Button`) or a shared class constant in `src/components/styles.ts`.
- Dialogs use the native `<dialog>` element with `showModal()`, wrapped in `src/components/Dialog.tsx`.
- Every interactive element uses the shared focus ring (`FOCUS_RING` in `src/components/styles.ts`).
- Dark mode: `@custom-variant dark` (class `dark` on `<html>`, set by `src/useTheme.ts`). Every color token has a light and a dark value in `tokens/tokens.json`. Components do not use `dark:` classes for colors; they only use tokens. Text on a colored background uses its `on-*` token, never `text-white`.

Rules for every approach:

- Every interactive element must work with the keyboard and show a visible focus.
- Colors and spacing come from one place (theme, variables or design scale), do not invent new values.
- Check the layout at 360px and at 1280px.
