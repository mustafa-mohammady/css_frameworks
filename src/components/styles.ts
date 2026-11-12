/** Shared class lists, so they are written once. Colors come from the tokens in `src/index.css`. */

export const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const FIELD = `w-full rounded-md border bg-surface px-3 py-2 text-text placeholder:text-muted ${FOCUS_RING}`;

/** Classes for input, select and textarea. */
export function fieldClass(invalid = false): string {
  return `${FIELD} ${invalid ? "border-danger" : "border-border"}`;
}

export const DIALOG_BODY = "flex flex-col gap-4 p-4";

export const DIALOG_FOOTER = "flex justify-end gap-2 border-t border-border p-4";
