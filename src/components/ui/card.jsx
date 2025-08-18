export function Card({ className = "", children }) {
  return <div className={`rounded-2xl ${className}`}>{children}</div>;
}
export function CardHeader({ className = "", children }) {
  return <div className={`p-5 border-b border-gray-100 dark:border-neutral-800 ${className}`}>{children}</div>;
}
export function CardTitle({ className = "", children }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}
export function CardContent({ className = "", children }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}
