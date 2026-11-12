import { useRef, useState, type FormEvent } from "react";

import { STATUS_LABELS } from "../books";
import type { NewBook, Status } from "../types";
import Button from "./Button";
import FormField from "./FormField";
import { DIALOG_BODY, DIALOG_FOOTER, fieldClass } from "./styles";

const STATUSES = Object.keys(STATUS_LABELS) as Status[];
const RATINGS = [1, 2, 3, 4, 5];

type Errors = { title: boolean; author: boolean };

type BookFormProps = {
  initial: NewBook;
  onSave: (book: NewBook) => void;
  onCancel: () => void;
};

export default function BookForm({ initial, onSave, onCancel }: BookFormProps) {
  const [values, setValues] = useState<NewBook>(initial);
  const [errors, setErrors] = useState<Errors>({ title: false, author: false });
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

  function update(changes: Partial<NewBook>) {
    setValues((current) => ({ ...current, ...changes }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = values.title.trim();
    const author = values.author.trim();
    const nextErrors = { title: title === "", author: author === "" };
    setErrors(nextErrors);

    if (nextErrors.title) {
      titleRef.current?.focus();
      return;
    }
    if (nextErrors.author) {
      authorRef.current?.focus();
      return;
    }
    onSave({ ...values, title, author, notes: values.notes.trim() });
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className={DIALOG_BODY}>
        <FormField
          id="book-title"
          label="Title"
          error={errors.title ? "Please enter a title." : undefined}
        >
          <input
            id="book-title"
            ref={titleRef}
            data-autofocus
            required
            value={values.title}
            aria-invalid={errors.title}
            aria-describedby={errors.title ? "book-title-error" : undefined}
            onChange={(event) => update({ title: event.target.value })}
            className={fieldClass(errors.title)}
          />
        </FormField>

        <FormField
          id="book-author"
          label="Author"
          error={errors.author ? "Please enter an author." : undefined}
        >
          <input
            id="book-author"
            ref={authorRef}
            required
            value={values.author}
            aria-invalid={errors.author}
            aria-describedby={errors.author ? "book-author-error" : undefined}
            onChange={(event) => update({ author: event.target.value })}
            className={fieldClass(errors.author)}
          />
        </FormField>

        <FormField id="book-status" label="Status">
          <select
            id="book-status"
            value={values.status}
            onChange={(event) => update({ status: event.target.value as Status })}
            className={fieldClass()}
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="book-rating" label="Rating">
          <select
            id="book-rating"
            value={values.rating === null ? "" : String(values.rating)}
            onChange={(event) =>
              update({ rating: event.target.value === "" ? null : Number(event.target.value) })
            }
            className={fieldClass()}
          >
            <option value="">Not rated</option>
            {RATINGS.map((rating) => (
              <option key={rating} value={rating}>
                {rating} {rating === 1 ? "star" : "stars"}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="book-notes" label="Notes">
          <textarea
            id="book-notes"
            rows={3}
            value={values.notes}
            onChange={(event) => update({ notes: event.target.value })}
            className={fieldClass()}
          />
        </FormField>
      </div>
      <div className={DIALOG_FOOTER}>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
