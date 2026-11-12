// Generates the token files for both styling approaches from tokens.json.
// Run with `npm run tokens` after you change tokens.json. Do not edit the outputs by hand.
//
// - tokens.css   CSS custom properties (light, dark, spacing). Used by the Tailwind version.
// - _tokens.scss Sass maps with the same values. Used by the Bootstrap version, because
//                Bootstrap computes its shades and button colors in Sass and needs real colors.

import { readFileSync, writeFileSync } from "node:fs";

const dir = new URL(".", import.meta.url);
const tokens = JSON.parse(readFileSync(new URL("tokens.json", dir), "utf8"));
const { light, dark } = tokens.color;
const header = "/* Generated from tokens/tokens.json by tokens/build.mjs. Do not edit. */\n";

const missing = Object.keys(light).filter((name) => !(name in dark));
if (missing.length > 0) {
  throw new Error(`Dark value missing for: ${missing.join(", ")}`);
}

const cssVars = (entries, prefix) =>
  Object.entries(entries)
    .map(([name, value]) => `  --token-${prefix}-${name}: ${value};`)
    .join("\n");

const css = `${header}
:root {
  color-scheme: light;
${cssVars(light, "color")}
${cssVars(tokens.space, "space")}
}

/* Tailwind sets the class "dark", Bootstrap sets data-bs-theme="dark". */
.dark,
[data-bs-theme="dark"] {
  color-scheme: dark;
${cssVars(dark, "color")}
}
`;

const scssMap = (name, entries, quoteKeys) =>
  `$${name}: (\n${Object.entries(entries)
    .map(([key, value]) => `  ${quoteKeys ? `"${key}"` : key}: ${value},`)
    .join("\n")}\n);`;

const scss = `${header}
${scssMap("token-colors", light, true)}

${scssMap("token-colors-dark", dark, true)}

${scssMap("token-spaces", tokens.space, false)}
`;

writeFileSync(new URL("tokens.css", dir), css);
writeFileSync(new URL("_tokens.scss", dir), scss);
console.log("Wrote tokens/tokens.css and tokens/_tokens.scss");
