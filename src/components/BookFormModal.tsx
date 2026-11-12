import Modal from "react-bootstrap/Modal";

import type { Book, NewBook } from "../types";
import BookForm from "./BookForm";

const EMPTY_BOOK: NewBook = {
  title: "",
  author: "",
  status: "want-to-read",
  rating: null,
  notes: "",
};

type BookFormModalProps = {
  show: boolean;
  /** The book to edit, or `null` to add a new one. */
  book: Book | null;
  onSave: (book: NewBook) => void;
  onHide: () => void;
  onExited: () => void;
};

export default function BookFormModal({
  show,
  book,
  onSave,
  onHide,
  onExited,
}: BookFormModalProps) {
  const title = book ? "Edit book" : "Add book";
  const initial: NewBook = book
    ? {
        title: book.title,
        author: book.author,
        status: book.status,
        rating: book.rating,
        notes: book.notes,
      }
    : EMPTY_BOOK;

  return (
    <Modal
      show={show}
      onHide={onHide}
      onExited={onExited}
      restoreFocus={false}
      aria-labelledby="book-form-title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="book-form-title" as="h2" className="h5">
          {title}
        </Modal.Title>
      </Modal.Header>
      <BookForm initial={initial} onSave={onSave} onCancel={onHide} />
    </Modal>
  );
}
