import React from "react";

export function Button({ className = "", variant = "default", asChild, children, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm transition border";
  const variants =
    variant === "outline"
      ? "bg-transparent border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
      : "bg-brand text-white border-brand hover:opacity-90";

  if (asChild && React.isValidElement(children)) {
    const prev = children.props.className || "";
    return React.cloneElement(children, {
      ...props,
      className: `${base} ${variants} ${className} ${prev}`.trim(),
    });
  }

  return (
    <button className={`${base} ${variants} ${className}`} {...props}>
      {children}
    </button>
  );
}
