import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = '',
    ...props
}, ref) {

    const id = useId();

    return (
        <div className='w-full group'>
            {label && (
                <label
                    className="block mb-1.5 pl-1 text-sm font-semibold text-gray-400 uppercase tracking-widest"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`
                    ${className}
                    w-full px-4 py-3 rounded-xl
                    bg-gray-800 text-gray-100
                    border border-gray-700
                    placeholder-gray-500
                    outline-none
                    transition-all duration-200
                    focus:bg-gray-750 focus:border-amber-500
                    focus:ring-2 focus:ring-amber-500/20
                    hover:border-gray-500
                `}
                ref={ref}
                id={id}
                {...props}
            />
        </div>
    )
})

export default Input
