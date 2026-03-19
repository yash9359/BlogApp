import React from 'react'

function Logo({ width = '100px' }) {
    return (
        <div className="flex items-center gap-2.5" style={{ width }}>
            {/* Pen nib icon */}
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500 shadow-lg shadow-amber-500/30">
                <svg
                    className="w-5 h-5 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 3.487a2.25 2.25 0 013.18 3.18L7.5 19.21l-4.5 1.5 1.5-4.5L16.862 3.487z"
                    />
                </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
                Blog<span className="text-amber-400">App</span>
            </span>
        </div>
    )
}

export default Logo
