import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-amber-500',
    textColor = 'text-gray-900',
    className = '',
    ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-6 py-3 rounded-xl font-semibold tracking-wide
        shadow-lg hover:shadow-xl
        transition-all duration-200
        active:scale-95 hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900
        ${bgColor} ${textColor} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
