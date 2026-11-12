import type { Theme } from "../useTheme";
import Button from "./Button";

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
};

/** A toggle button: the name stays "Dark mode", `aria-pressed` tells the state. */
export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";
  return (
    <Button variant="secondary" aria-pressed={isDark} onClick={onToggle}>
      <span aria-hidden="true" className="mr-2">
        {/* U+FE0E: show the sun as a text glyph, not a color emoji. */}
        {isDark ? "☾" : "☀︎"}
      </span>
      Dark mode
    </Button>
  );
}
