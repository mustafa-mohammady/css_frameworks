import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  /** Shown below the field. Link it with `aria-describedby={`${id}-error`}`. */
  error?: string;
  children: ReactNode;
};

export default function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
