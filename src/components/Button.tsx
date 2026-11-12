import type { ComponentProps } from "react";

import { FOCUS_RING } from "./styles";

type Variant = "primary" | "secondary" | "danger" | "outline-primary" | "outline-danger";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary: "border border-border bg-surface text-text hover:bg-surface-muted",
  danger: "bg-danger text-white hover:bg-danger-hover",
  "outline-primary": "border border-primary text-primary hover:bg-primary hover:text-white",
  "outline-danger": "border border-danger text-danger hover:bg-danger hover:text-white",
};

const SIZES: Record<Size, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
};

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export default function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors ${FOCUS_RING} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    />
  );
}
