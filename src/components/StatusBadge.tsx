import { STATUS_LABELS } from "../books";
import type { Status } from "../types";

/** The one place where a status gets its colors. */
const STATUS_CLASSES: Record<Status, string> = {
  "want-to-read": "bg-want-bg text-want-fg",
  reading: "bg-reading-bg text-reading-fg",
  done: "bg-done-bg text-done-fg",
};

type StatusBadgeProps = {
  status: Status;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${STATUS_CLASSES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
