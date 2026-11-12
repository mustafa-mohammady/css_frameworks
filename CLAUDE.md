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

Approach: **Bootstrap 5** with **react-bootstrap**.

- Use Bootstrap utility classes for layout, spacing and typography (`container`, `row`, `col-*`, `d-flex`, `gap-*`, `p-*`, `m-*`, `text-*`).
- Use `react-bootstrap` components for interactive parts: `Modal` for dialogs, `Toast` / `ToastContainer` for messages, `Button`, `Form`, `Card`, `Badge`.
- Do not use Bootstrap's own JavaScript (`bootstrap.bundle.js`) or `data-bs-toggle`. It does not work well with React.
- Colors come only from Bootstrap theme colors (`primary`, `secondary`, `success`, `danger`, `warning`, `light`, `dark`). Do not invent hex colors.
- Spacing comes only from the Bootstrap scale (`0` to `5`). Do not invent pixel values.
- No inline `style` props, no other CSS libraries.
- If the same class list is repeated, extract a component.

Rules for every approach:

- Every interactive element must work with the keyboard and show a visible focus.
- Colors and spacing come from one place (theme, variables or design scale), do not invent new values.
- Check the layout at 360px and at 1280px.
