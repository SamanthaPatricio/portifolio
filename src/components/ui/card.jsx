import React from 'react'

export function Card({ className = '', children, ...props }) {
  return <div className={`rounded-2xl border bg-white shadow-soft ${className}`} {...props}>{children}</div>
}
export function CardHeader({ className = '', children, ...props }) {
  return <div className={`p-4 ${className}`} {...props}>{children}</div>
}
export function CardTitle({ className = '', children, ...props }) {
  return <h3 className={`text-lg font-semibold ${className}`} {...props}>{children}</h3>
}
export function CardContent({ className = '', children, ...props }) {
  return <div className={`p-4 pt-0 ${className}`} {...props}>{children}</div>
}
