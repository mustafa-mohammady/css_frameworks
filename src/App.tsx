import { useEffect, useRef, useState } from "react";

import { filterBooks } from "./books";
import AppHeader from "./components/AppHeader";
import BookFormDialog from "./components/BookFormDialog";
import BookList from "./components/BookList";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import Toast from "./components/Toast";
import Toolbar from "./components/Toolbar";
import type { Book, NewBook, StatusFilter } from "./types";
import { useBooks } from "./useBooks";
import { useTheme } from "./useTheme";

type DialogState = { open: boolean; book: Book | null };

const CLOSED: DialogState = { open: false, book: null };
const TOAST_DURATION_MS = 3000;

export default function App() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [formDialog, setFormDialog] = useState<DialogState>(CLOSED);
  const [deleteDialog, setDeleteDialog] = useState<DialogState>(CLOSED);
  const [toast, setToast] = useState({ show: false, message: "" });

  const triggerRef = useRef<HTMLElement | null>(null);
  const countHeadingRef = useRef<HTMLHeadingElement>(null);

  const visibleBooks = filterBooks(books, { status, query });

  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(
      () => setToast((current) => ({ ...current, show: false })),
      TOAST_DURATION_MS
    );
    return () => clearTimeout(timer);
  }, [toast]);

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
    setFormDialog({ open: true, book });
  }

  function openDelete(book: Book, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setDeleteDialog({ open: true, book });
  }

  function handleSave(values: NewBook) {
    if (formDialog.book) {
      updateBook(formDialog.book.id, values);
      showToast("Book updated");
    } else {
      addBook(values);
      showToast("Book added");
    }
    setFormDialog(CLOSED);
  }

  function handleConfirmDelete() {
    if (deleteDialog.book) {
      deleteBook(deleteDialog.book.id);
      showToast("Book deleted");
    }
    setDeleteDialog(CLOSED);
  }

  function clearFilters() {
    setQuery("");
    setStatus("all");
  }

  return (
    <div className="min-h-screen bg-surface text-text">
      <main className="mx-auto max-w-6xl px-3 py-4">
        <AppHeader
          theme={theme}
          onToggleTheme={toggleTheme}
          onAdd={(trigger) => openForm(null, trigger)}
        />
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
      </main>

      <BookFormDialog
        open={formDialog.open}
        book={formDialog.book}
        onSave={handleSave}
        onClose={() => setFormDialog(CLOSED)}
        onClosed={returnFocus}
      />
      <DeleteConfirmDialog
        open={deleteDialog.open}
        book={deleteDialog.book}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteDialog(CLOSED)}
        onClosed={returnFocus}
      />
      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast((current) => ({ ...current, show: false }))}
      />
    </div>
  );
}
