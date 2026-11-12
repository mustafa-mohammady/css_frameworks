import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode, type SyntheticEvent } from "react";

import { FOCUS_RING } from "./styles";

type DialogProps = {
  open: boolean;
  title: string;
  /** Called on Escape, the close button, or Cancel. The parent sets `open` to false. */
  onClose: () => void;
  /** Called after the dialog has closed, to move the focus back. */
  onClosed: () => void;
  children: ReactNode;
};

/**
 * A modal built on the native `<dialog>`. `showModal()` makes the rest of the
 * page inert, so the focus stays inside. React state stays the source of truth.
 */
export default function Dialog({ open, title, onClose, onClosed, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const wasOpen = useRef(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !wasOpen.current) {
      wasOpen.current = true;
      if (!dialog.open) dialog.showModal();
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    } else if (!open && wasOpen.current) {
      wasOpen.current = false;
      if (dialog.open) dialog.close();
      onClosed();
    }
  }, [open, onClosed]);

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  }

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onKeyDown={handleKeyDown}
      onCancel={handleCancel}
      className="m-auto w-full max-w-lg bg-transparent p-3 backdrop:bg-backdrop/50"
    >
      {open && (
        <div className="rounded-lg bg-surface text-text shadow-xl">
          <div className="flex items-center justify-between gap-3 border-b border-border p-3">
            <h2 id={titleId} className="text-lg font-semibold">
              {title}
            </h2>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className={`rounded-md px-2 text-2xl leading-none text-muted hover:text-text ${FOCUS_RING}`}
            >
              ×
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
