import React, { useState, useEffect } from 'react'
import service from '../src/appwrite/conf'
import { Container, PostCard } from '../Components/index'

function AllPosts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) setPosts(posts.documents || []);
        }).finally(() => setLoading(false))
    }, [])

    return (
        <div className='min-h-screen bg-gray-950 py-10'>
            <Container>

                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-2xl font-extrabold text-white'>All Posts</h1>
                    {!loading && (
                        <p className='text-gray-500 text-sm mt-1'>
                            {posts.length} article{posts.length !== 1 ? 's' : ''} found
                        </p>
                    )}
                </div>

                {/* Loading skeleton */}
                {loading && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className='bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden animate-pulse'>
                                <div className='aspect-video bg-gray-800' />
                                <div className='p-4 space-y-2'>
                                    <div className='h-4 bg-gray-800 rounded w-3/4' />
                                    <div className='h-4 bg-gray-800 rounded w-1/2' />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && posts.length === 0 && (
                    <div className='flex flex-col items-center gap-4 py-20 text-center'>
                        <div className='w-16 h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-3xl'>
                            📭
                        </div>
                        <h2 className='text-xl font-bold text-white'>No posts found</h2>
                        <p className='text-gray-500'>Check back later for new content.</p>
                    </div>
                )}

                {/* Posts grid */}
                {!loading && posts.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}

            </Container>
        </div>
    )
}

export default AllPosts
