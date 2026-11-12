import { useRef, useState, type FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { STATUS_LABELS } from "../books";
import type { NewBook, Status } from "../types";

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
    <Form noValidate onSubmit={handleSubmit}>
      <Modal.Body className="d-flex flex-column gap-3">
        <Form.Group controlId="book-title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            ref={titleRef}
            autoFocus
            required
            value={values.title}
            isInvalid={errors.title}
            onChange={(event) => update({ title: event.target.value })}
          />
          <Form.Control.Feedback type="invalid">Please enter a title.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="book-author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            ref={authorRef}
            required
            value={values.author}
            isInvalid={errors.author}
            onChange={(event) => update({ author: event.target.value })}
          />
          <Form.Control.Feedback type="invalid">Please enter an author.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="book-status">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={values.status}
            onChange={(event) => update({ status: event.target.value as Status })}
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="book-rating">
          <Form.Label>Rating</Form.Label>
          <Form.Select
            value={values.rating === null ? "" : String(values.rating)}
            onChange={(event) =>
              update({ rating: event.target.value === "" ? null : Number(event.target.value) })
            }
          >
            <option value="">Not rated</option>
            {RATINGS.map((rating) => (
              <option key={rating} value={rating}>
                {rating} {rating === 1 ? "star" : "stars"}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="book-notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={values.notes}
            onChange={(event) => update({ notes: event.target.value })}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Modal.Footer>
    </Form>
  );
}
