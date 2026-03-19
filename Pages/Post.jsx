import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../src/appwrite/conf";
import { Button, Container } from "../Components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="min-h-screen bg-gray-950 py-10">
            <Container>

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-amber-400 transition-colors duration-200 mb-6 group"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                {/* Featured image */}
                <div className="w-full relative rounded-2xl overflow-hidden border border-gray-800 mb-8 bg-gray-900">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full max-h-[500px] object-cover"
                    />

                    {/* Author actions overlay */}
                    {isAuthor && (
                        <div className="absolute right-4 top-4 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-900/90 backdrop-blur-sm text-emerald-400 border border-emerald-500/30 text-sm font-semibold rounded-xl hover:bg-emerald-500/20 transition-all duration-200">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={deletePost}
                                className="flex items-center gap-1.5 px-4 py-2 bg-gray-900/90 backdrop-blur-sm text-red-400 border border-red-500/30 text-sm font-semibold rounded-xl hover:bg-red-500/20 transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                {/* Article */}
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8 leading-tight">
                        {post.title}
                    </h1>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-px flex-1 bg-gray-800" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <div className="h-px flex-1 bg-gray-800" />
                    </div>

                    {/* Content */}
                    <div className="
                        max-w-none text-gray-300 leading-relaxed
                        prose prose-invert prose-lg
                        prose-headings:text-white prose-headings:font-bold
                        prose-p:text-gray-300 prose-p:leading-relaxed
                        prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-white
                        prose-blockquote:border-amber-500 prose-blockquote:text-gray-400
                        prose-code:text-amber-300 prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                        [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white
                        [&_p]:text-gray-300 [&_li]:text-gray-300 [&_span]:text-gray-300 [&_div]:text-gray-300
                        [&_strong]:text-white [&_em]:text-gray-200
                        [&_a]:text-amber-400 [&_a]:underline-offset-2 hover:[&_a]:underline
                    ">
                        {parse(post.content)}
                    </div>
                </div>

            </Container>
        </div>
    ) : null;
}
