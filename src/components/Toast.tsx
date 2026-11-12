type ToastProps = {
  show: boolean;
  message: string;
  onClose: () => void;
};

/** The live region is always in the page, so screen readers announce new messages. */
export default function Toast({ show, message, onClose }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 flex justify-end sm:left-auto"
    >
      {show && (
        <div className="pointer-events-auto flex items-center gap-3 rounded-lg bg-done-fg py-3 pr-2 pl-4 text-white shadow-lg">
          <span>{message}</span>
          <button
            type="button"
            aria-label="Close message"
            onClick={onClose}
            className="rounded-md px-2 text-xl leading-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
