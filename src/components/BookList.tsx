import type { RefObject } from "react";

import type { Book } from "../types";
import BookCard from "./BookCard";
import EmptyState from "./EmptyState";

type BookListProps = {
  books: Book[];
  hasBooks: boolean;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onEdit: (book: Book, trigger: HTMLElement) => void;
  onDelete: (book: Book, trigger: HTMLElement) => void;
  onClearFilters: () => void;
};

export default function BookList({
  books,
  hasBooks,
  headingRef,
  onEdit,
  onDelete,
  onClearFilters,
}: BookListProps) {
  return (
    <section>
      <h2 ref={headingRef} tabIndex={-1} className="mb-4 text-sm font-medium text-muted">
        {books.length} {books.length === 1 ? "book" : "books"}
      </h2>
      {books.length === 0 ? (
        <EmptyState hasBooks={hasBooks} onClearFilters={onClearFilters} />
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </section>
  );
}
