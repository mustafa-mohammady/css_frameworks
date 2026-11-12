import Button from "./Button";

type EmptyStateProps = {
  hasBooks: boolean;
  onClearFilters: () => void;
};

export default function EmptyState({ hasBooks, onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-surface-muted px-4 py-12 text-center">
      {hasBooks ? (
        <>
          <p>No books match your search or filter.</p>
          <Button variant="outline-primary" onClick={onClearFilters}>
            Clear filters
          </Button>
        </>
      ) : (
        <p>Your reading list is empty. Add your first book.</p>
      )}
    </div>
  );
}
