import React from 'react'
import service from "../../src/appwrite/conf"
import { Link } from "react-router-dom"

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className='block group'>
            <div className='
                w-full bg-gray-900 rounded-2xl overflow-hidden
                border border-gray-800
                shadow-lg
                hover:border-amber-500/40 hover:shadow-amber-500/10 hover:shadow-xl
                hover:-translate-y-1
                transition-all duration-300
            '>
                {/* Image */}
                <div className='overflow-hidden aspect-video bg-gray-800'>
                    <img
                        src={service.getFilePreview(featuredImage)}
                        alt={title}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                </div>

                {/* Content */}
                <div className='p-4'>
                    <h2 className='text-base font-bold text-gray-100 line-clamp-2 group-hover:text-amber-400 transition-colors duration-200'>
                        {title}
                    </h2>
                    <div className='flex items-center gap-1 mt-3 text-amber-500 text-xs font-semibold tracking-wide'>
                        <span>Read article</span>
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
