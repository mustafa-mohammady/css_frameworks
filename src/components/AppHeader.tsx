import type { Theme } from "../useTheme";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

type AppHeaderProps = {
  theme: Theme;
  onToggleTheme: () => void;
  onAdd: (trigger: HTMLElement) => void;
};

export default function AppHeader({ theme, onToggleTheme, onAdd }: AppHeaderProps) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
      <h1 className="text-2xl font-semibold">Reading List</h1>
      <div className="flex flex-wrap gap-2">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <Button onClick={(event) => onAdd(event.currentTarget)}>+ Add book</Button>
      </div>
    </header>
  );
}
