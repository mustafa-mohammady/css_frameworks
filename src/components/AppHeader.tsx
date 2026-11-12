import Button from "react-bootstrap/Button";

type AppHeaderProps = {
  onAdd: (trigger: HTMLElement) => void;
};

export default function AppHeader({ onAdd }: AppHeaderProps) {
  return (
    <header className="d-flex justify-content-between align-items-center flex-wrap gap-3 pb-3 mb-4 border-bottom">
      <h1 className="h3 mb-0">Reading List</h1>
      <Button variant="primary" onClick={(event) => onAdd(event.currentTarget)}>
        + Add book
      </Button>
    </header>
  );
}
