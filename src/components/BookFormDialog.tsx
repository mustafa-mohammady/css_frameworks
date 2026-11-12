import type { Book, NewBook } from "../types";
import BookForm from "./BookForm";
import Dialog from "./Dialog";

const EMPTY_BOOK: NewBook = {
  title: "",
  author: "",
  status: "want-to-read",
  rating: null,
  notes: "",
};

type BookFormDialogProps = {
  open: boolean;
  /** The book to edit, or `null` to add a new one. */
  book: Book | null;
  onSave: (book: NewBook) => void;
  onClose: () => void;
  onClosed: () => void;
};

export default function BookFormDialog({
  open,
  book,
  onSave,
  onClose,
  onClosed,
}: BookFormDialogProps) {
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
    <Dialog
      open={open}
      title={book ? "Edit book" : "Add book"}
      onClose={onClose}
      onClosed={onClosed}
    >
      <BookForm initial={initial} onSave={onSave} onCancel={onClose} />
    </Dialog>
  );
}
