export function Button({ variant = "default", className = "", asChild = false, children, ...props }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm transition";
  const variants = {
    default: "bg-brand text-white border-brand hover:opacity-90",
    outline: "border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
  };
  const cls = `${base} ${variants[variant] || ""} ${className}`;
  if (asChild) return <a className={cls} {...props}>{children}</a>;
  return <button className={cls} {...props}>{children}</button>;
}
