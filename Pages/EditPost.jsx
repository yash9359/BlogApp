import React, { useEffect, useState } from 'react'
import { Container, PostForm } from "../Components/index"
import service from '../src/appwrite/conf'
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
            })
        } else {
            navigate("/");
        }
    }, [])

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-gray-700 border-t-amber-500 rounded-full animate-spin" />
                    <p className="text-gray-500 text-sm tracking-widest uppercase">Loading post...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-gray-950 min-h-screen'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    )
}

export default EditPost
