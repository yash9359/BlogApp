import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import service from '../src/appwrite/conf'
import { Container, PostCard } from '../Components/index'
import { Link } from 'react-router-dom'

function Home() {

    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth?.status)

    useEffect(() => {
        if (!authStatus) return
        service.getPosts().then((posts) => {
            if (posts) setPosts(posts.documents || []);
            else setPosts([]);
        })
    }, [authStatus])

    if (!authStatus) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-gray-950">
                {/* Glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
                </div>
                <Container>
                    <div className="relative flex flex-col items-center gap-6 text-center py-20">
                        <div className="w-20 h-20 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-4xl shadow-xl">
                            🔒
                        </div>
                        <div>
                            <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
                                Welcome to <span className="text-amber-400">BlogApp</span>
                            </h1>
                            <p className="text-gray-400 text-lg max-w-md mx-auto">
                                Sign in to explore stories, ideas, and perspectives from writers around the world.
                            </p>
                        </div>
                        <div className="flex gap-3 mt-2">
                            <Link
                                to="/login"
                                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-amber-500/20"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl border border-gray-700 transition-all duration-200 hover:-translate-y-0.5"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-gray-950">
                <Container>
                    <div className="flex flex-col items-center gap-5 text-center py-20">
                        <div className="w-20 h-20 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-4xl">
                            📝
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">No posts yet</h1>
                            <p className="text-gray-500">Be the first one to share something amazing!</p>
                        </div>
                        <Link
                            to="/add-post"
                            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-amber-500/20"
                        >
                            + Write a Post
                        </Link>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-10 bg-gray-950 min-h-screen">
            <Container>
                {/* Page heading */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white">Latest Posts</h1>
                        <p className="text-gray-500 text-sm mt-1">{posts.length} article{posts.length !== 1 ? 's' : ''} published</p>
                    </div>
                    <Link
                        to="/add-post"
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-900 text-sm font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-amber-500/20"
                    >
                        + New Post
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
