import Button from "react-bootstrap/Button";

type EmptyStateProps = {
  hasBooks: boolean;
  onClearFilters: () => void;
};

export default function EmptyState({ hasBooks, onClearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-5 px-3 border rounded bg-body-tertiary">
      {hasBooks ? (
        <>
          <p className="mb-3">No books match your search or filter.</p>
          <Button variant="outline-primary" onClick={onClearFilters}>
            Clear filters
          </Button>
        </>
      ) : (
        <p className="mb-0">Your reading list is empty. Add your first book.</p>
      )}
    </div>
  );
}
