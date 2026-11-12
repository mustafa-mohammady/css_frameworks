import type { Book } from "../types";
import Button from "./Button";
import StarRating from "./StarRating";
import StatusBadge from "./StatusBadge";

type BookCardProps = {
  book: Book;
  onEdit: (book: Book, trigger: HTMLElement) => void;
  onDelete: (book: Book, trigger: HTMLElement) => void;
};

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <li className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3 shadow-sm">
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-muted">{book.author}</p>
      <div className="flex items-center gap-2">
        <StatusBadge status={book.status} />
        <StarRating rating={book.rating} />
      </div>
      {book.notes && <p className="text-sm">{book.notes}</p>}
      <div className="mt-auto flex gap-2 pt-2">
        <Button
          variant="outline-primary"
          size="sm"
          aria-label={`Edit ${book.title}`}
          onClick={(event) => onEdit(book, event.currentTarget)}
        >
          Edit
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          aria-label={`Delete ${book.title}`}
          onClick={(event) => onDelete(book, event.currentTarget)}
        >
          Delete
        </Button>
      </div>
    </li>
  );
}
