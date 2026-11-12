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
      <h2 ref={headingRef} tabIndex={-1} className="h6 text-body-secondary mb-3">
        {books.length} {books.length === 1 ? "book" : "books"}
      </h2>
      {books.length === 0 ? (
        <EmptyState hasBooks={hasBooks} onClearFilters={onClearFilters} />
      ) : (
        <ul className="list-unstyled row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3 mb-0">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </section>
  );
}
