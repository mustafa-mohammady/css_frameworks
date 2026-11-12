# Design tokens

Colors and spacing are defined **once**, in `tokens.json`. This folder is identical in the Tailwind version (`main`, `bonus-design-tokens`) and the Bootstrap version (`bonus-design-tokens-bootstrap`).

| File | What it is |
| --- | --- |
| `tokens.json` | The source. Colors (light and dark) and the spacing scale `0` to `5`. |
| `build.mjs` | Generates the two files below. Run `npm run tokens` after a change. |
| `tokens.css` | Generated. CSS custom properties (`--token-color-primary`, `--token-space-3`, ...). Used by Tailwind. |
| `_tokens.scss` | Generated. Sass maps (`$token-colors`, `$token-spaces`). Used by Bootstrap. |

To change a color or a spacing step: edit `tokens.json`, run `npm run tokens`, commit, and bring the same commit to the other branch (`git cherry-pick`).

The spacing scale has Bootstrap's steps: `0` = 0, `1` = 0.25rem, `2` = 0.5rem, `3` = 1rem, `4` = 1.5rem, `5` = 3rem. So `p-3` or `gap-2` means the same size in both versions.

## How each version uses the tokens

**Tailwind CSS v4** (`src/index.css`)

- `@import "../tokens/tokens.css"`, then `@theme inline` maps each token to a utility: `--color-primary: var(--token-color-primary)` gives `bg-primary`, `text-primary`, ...
- `--spacing: initial` switches off Tailwind's default spacing scale, and `--spacing-0` to `--spacing-5` add the token steps. A class like `p-6` simply does not exist anymore.
- Dark mode needs nothing extra: `tokens.css` has the dark values under `.dark`, and the utilities read the variables at runtime.

**Bootstrap 5** (`src/bootstrap.scss`)

- Bootstrap is compiled from its Sass source (new dev dependency `sass`) instead of the precompiled `bootstrap.min.css`.
- `_tokens.scss` feeds Bootstrap's variables: `$primary`, `$danger`, `$body-color`, `$body-bg`, `$border-color`, the `-bg-subtle` / `-text-emphasis` colors for the status badges, and `$spacers` for the spacing scale.
- A color Bootstrap has no slot for (the star) becomes a new utility, `.text-star`, via the Utility API.
- Bootstrap computes hover shades itself, so the token hover colors are set afterwards through its `--bs-btn-*` CSS variables.

## Which approach makes this easier, and which makes it harder?

**Easier: Tailwind CSS v4.** Its theme is made of CSS variables, so the tokens plug in directly:

- One `@import` and one mapping block are enough. No extra build step or dependency.
- The whole scale can be replaced, and the default scale switched off, so you can't use a value that isn't a token.
- Dark mode works at runtime, because utilities read the variables (`var(--token-…)`) when the page is shown.

**Harder: Bootstrap 5.**

- The precompiled CSS has fixed values, so the tokens only reach it at **build time through Sass**. That means a new dependency, a Sass entry file, and silencing Bootstrap 5.3's Sass deprecation warnings.
- **Sass needs real colors, not CSS variables.** Bootstrap computes shades, tints, button text contrast and focus rings from `$primary` in Sass. That is why the tokens are also generated as `_tokens.scss` with literal hex values.
- **Bootstrap's own color model gets in the way:**
  - Hover colors are computed, so the token hover colors need an override.
  - The status colors have to be mapped onto `secondary` / `warning` / `success`.
  - A new color needs the Utility API.
- **Dark mode is limited.** Bootstrap's theme colors (`$primary`) stay the same in `data-bs-theme="dark"`; only the body, subtle and emphasis colors have `-dark` variants. So the token dark values would not fully apply in Bootstrap without more mapping.
- **Spacing**, on the other hand, works well in Bootstrap: `$spacers` has exactly the same idea of a fixed 0 to 5 scale.
