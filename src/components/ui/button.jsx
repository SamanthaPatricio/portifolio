import React from 'react'

export function Button({ variant = 'default', asChild, className = '', children, ...props }) {
  const base = 'inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm transition border shadow-soft'
  const variants = {
    default: 'bg-black text-white border-black hover:opacity-90',
    outline: 'bg-white text-black border-gray-300 hover:bg-gray-50'
  }
  const Tag = asChild ? 'a' : 'button'
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
