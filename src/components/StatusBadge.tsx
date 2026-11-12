import Badge from "react-bootstrap/Badge";

import { STATUS_LABELS } from "../books";
import type { Status } from "../types";

/** The one place where a status gets its theme color. */
const STATUS_VARIANTS: Record<Status, { bg: string; text?: "dark" }> = {
  "want-to-read": { bg: "secondary" },
  reading: { bg: "warning", text: "dark" },
  done: { bg: "success" },
};

type StatusBadgeProps = {
  status: Status;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { bg, text } = STATUS_VARIANTS[status];
  return (
    <Badge bg={bg} text={text}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}
