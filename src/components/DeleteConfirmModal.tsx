import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import type { Book } from "../types";

type DeleteConfirmModalProps = {
  show: boolean;
  book: Book | null;
  onConfirm: () => void;
  onHide: () => void;
  onExited: () => void;
};

export default function DeleteConfirmModal({
  show,
  book,
  onConfirm,
  onHide,
  onExited,
}: DeleteConfirmModalProps) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      onExited={onExited}
      restoreFocus={false}
      aria-labelledby="delete-book-title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="delete-book-title" as="h2" className="h5">
          Delete book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">
          Do you really want to delete <strong>{book?.title}</strong>? This cannot be undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" autoFocus onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
