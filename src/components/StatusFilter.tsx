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

/** Real radio buttons, so the arrow keys move between the options. */
export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <fieldset className="flex flex-wrap gap-2">
      <legend className="sr-only">Filter by status</legend>
      {OPTIONS.map((option) => {
        const id = `status-filter-${option.value}`;
        return (
          <div key={option.value}>
            <input
              type="radio"
              id={id}
              name="status-filter"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <label
              htmlFor={id}
              className="inline-block cursor-pointer rounded-full border border-primary px-3 py-1 text-sm text-primary hover:bg-surface-muted peer-checked:bg-primary peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"
            >
              {option.label}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
