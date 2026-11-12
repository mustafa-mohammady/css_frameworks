import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import type { Book } from "../types";
import StarRating from "./StarRating";
import StatusBadge from "./StatusBadge";

type BookCardProps = {
  book: Book;
  onEdit: (book: Book, trigger: HTMLElement) => void;
  onDelete: (book: Book, trigger: HTMLElement) => void;
};

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <li className="col">
      <Card className="h-100 shadow-sm">
        <Card.Body className="d-flex flex-column gap-2">
          <Card.Title as="h3" className="h5 mb-0">
            {book.title}
          </Card.Title>
          <Card.Subtitle className="text-body-secondary">
            {book.author}
          </Card.Subtitle>
          <div className="d-flex align-items-center gap-2">
            <StatusBadge status={book.status} />
            <StarRating rating={book.rating} />
          </div>
          {book.notes && <Card.Text className="small mb-0">{book.notes}</Card.Text>}
          <div className="d-flex gap-2 mt-auto pt-2">
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
        </Card.Body>
      </Card>
    </li>
  );
}
