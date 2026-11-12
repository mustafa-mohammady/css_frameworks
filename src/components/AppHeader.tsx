import Button from "./Button";

type AppHeaderProps = {
  onAdd: (trigger: HTMLElement) => void;
};

export default function AppHeader({ onAdd }: AppHeaderProps) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
      <h1 className="text-2xl font-semibold">Reading List</h1>
      <Button onClick={(event) => onAdd(event.currentTarget)}>+ Add book</Button>
    </header>
  );
}
