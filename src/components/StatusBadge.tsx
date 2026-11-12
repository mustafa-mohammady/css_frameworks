import Badge from "react-bootstrap/Badge";

import { STATUS_LABELS } from "../books";
import type { Status } from "../types";

/** The one place where a status gets its theme color (subtle background, emphasis text). */
const STATUS_VARIANTS: Record<Status, string> = {
  "want-to-read": "secondary",
  reading: "warning",
  done: "success",
};

type StatusBadgeProps = {
  status: Status;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const variant = STATUS_VARIANTS[status];
  return (
    <Badge pill bg={`${variant}-subtle`} className={`text-${variant}-emphasis`}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}
