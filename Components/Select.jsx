import React, { useId } from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {

    const id = useId();

    return (
        <div className='w-full'>
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-1.5 pl-1 text-sm font-semibold text-gray-400 uppercase tracking-widest"
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`
                    w-full px-4 py-3 rounded-xl
                    bg-gray-800 text-gray-100
                    border border-gray-700
                    outline-none
                    transition-all duration-200
                    focus:border-amber-500
                    focus:ring-2 focus:ring-amber-500/20
                    hover:border-gray-500
                    cursor-pointer
                    appearance-none
                    ${className}
                `}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className="bg-gray-800 text-gray-100">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
