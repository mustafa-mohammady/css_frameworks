import type { Book } from "../types";
import Button from "./Button";
import Dialog from "./Dialog";
import { DIALOG_BODY, DIALOG_FOOTER } from "./styles";

type DeleteConfirmDialogProps = {
  open: boolean;
  book: Book | null;
  onConfirm: () => void;
  onClose: () => void;
  onClosed: () => void;
};

export default function DeleteConfirmDialog({
  open,
  book,
  onConfirm,
  onClose,
  onClosed,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} title="Delete book" onClose={onClose} onClosed={onClosed}>
      <div className={DIALOG_BODY}>
        <p>
          Do you really want to delete <strong>{book?.title}</strong>? This cannot be undone.
        </p>
      </div>
      <div className={DIALOG_FOOTER}>
        <Button variant="secondary" data-autofocus onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Dialog>
  );
}
