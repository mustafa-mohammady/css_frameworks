import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import { STATUS_LABELS } from "../books";
import type { Status, StatusFilter as StatusFilterValue } from "../types";

const OPTIONS: { value: StatusFilterValue; label: string }[] = [
  { value: "all", label: "All" },
  ...(Object.keys(STATUS_LABELS) as Status[]).map((status) => ({
    value: status,
    label: STATUS_LABELS[status],
  })),
];

type StatusFilterProps = {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
};

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <ToggleButtonGroup
      type="radio"
      name="status-filter"
      size="sm"
      className="flex-wrap"
      aria-label="Filter by status"
      value={value}
      onChange={(next: StatusFilterValue) => onChange(next)}
    >
      {OPTIONS.map((option) => (
        <ToggleButton
          key={option.value}
          id={`status-filter-${option.value}`}
          value={option.value}
          variant="outline-primary"
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
