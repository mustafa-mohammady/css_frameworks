import { useRef, useState } from "react";
import Container from "react-bootstrap/Container";

import { filterBooks } from "./books";
import AppHeader from "./components/AppHeader";
import AppToast from "./components/AppToast";
import BookFormModal from "./components/BookFormModal";
import BookList from "./components/BookList";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import Toolbar from "./components/Toolbar";
import type { Book, NewBook, StatusFilter } from "./types";
import { useBooks } from "./useBooks";

/** `book` stays set while the dialog fades out, so its content does not jump. */
type DialogState = { show: boolean; book: Book | null };

const CLOSED: DialogState = { show: false, book: null };

export default function App() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [formDialog, setFormDialog] = useState<DialogState>(CLOSED);
  const [deleteDialog, setDeleteDialog] = useState<DialogState>(CLOSED);
  const [toast, setToast] = useState({ show: false, message: "" });

  const triggerRef = useRef<HTMLElement | null>(null);
  const countHeadingRef = useRef<HTMLHeadingElement>(null);

  const visibleBooks = filterBooks(books, { status, query });

  function showToast(message: string) {
    setToast({ show: true, message });
  }

  /** Focus the button that opened the dialog, or the count heading if it is gone. */
  function returnFocus() {
    const trigger = triggerRef.current;
    if (trigger?.isConnected) {
      trigger.focus();
    } else {
      countHeadingRef.current?.focus();
    }
  }

  function openForm(book: Book | null, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setFormDialog({ show: true, book });
  }

  function openDelete(book: Book, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setDeleteDialog({ show: true, book });
  }

  function handleSave(values: NewBook) {
    if (formDialog.book) {
      updateBook(formDialog.book.id, values);
      showToast("Book updated");
    } else {
      addBook(values);
      showToast("Book added");
    }
    setFormDialog((current) => ({ ...current, show: false }));
  }

  function handleConfirmDelete() {
    if (deleteDialog.book) {
      deleteBook(deleteDialog.book.id);
      showToast("Book deleted");
    }
    setDeleteDialog((current) => ({ ...current, show: false }));
  }

  function clearFilters() {
    setQuery("");
    setStatus("all");
  }

  return (
    <>
      <Container as="main" className="py-4">
        <AppHeader onAdd={(trigger) => openForm(null, trigger)} />
        <Toolbar
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
        />
        <BookList
          books={visibleBooks}
          hasBooks={books.length > 0}
          headingRef={countHeadingRef}
          onEdit={openForm}
          onDelete={openDelete}
          onClearFilters={clearFilters}
        />
      </Container>

      <BookFormModal
        show={formDialog.show}
        book={formDialog.book}
        onSave={handleSave}
        onHide={() => setFormDialog((current) => ({ ...current, show: false }))}
        onExited={returnFocus}
      />
      <DeleteConfirmModal
        show={deleteDialog.show}
        book={deleteDialog.book}
        onConfirm={handleConfirmDelete}
        onHide={() => setDeleteDialog((current) => ({ ...current, show: false }))}
        onExited={returnFocus}
      />
      <AppToast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast((current) => ({ ...current, show: false }))}
      />
    </>
  );
}
