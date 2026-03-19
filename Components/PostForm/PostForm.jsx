import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Button.jsx'
import Input from '../Input.jsx'
import Select from '../Select.jsx'
import RTE from '../RTE.jsx'
import service from '../../src/appwrite/conf.js'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth?.userData || null);

    const submit = async (data) => {
        if (!userData) { alert("Please login first"); return; }
        try {
            if (post) {
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
                if (file) await service.deleteFile(post.featuredImage);
                delete data.image;
                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });
                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
                if (file) data.featuredImage = file.$id;
                delete data.image;
                const dbPost = await service.createPost({ ...data, userId: userData.$id });
                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("PostForm submit error:", error);
            alert("Error: " + error.message);
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')
        }
        return ''
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    return (
        <div className="min-h-screen bg-gray-950 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold text-white">
                    {post ? 'Edit Post' : 'Create New Post'}
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    {post ? 'Update your article details below.' : 'Fill in the details to publish your article.'}
                </p>
            </div>

            <form onSubmit={handleSubmit(submit)}>
                <div className="flex flex-wrap gap-6">

                    {/* Left — main content */}
                    <div className="flex-1 min-w-0 space-y-5">
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
                            <Input
                                label="Title"
                                placeholder="Your post title..."
                                {...register("title", { required: true })}
                            />
                            <Input
                                label="Slug"
                                placeholder="auto-generated-slug"
                                {...register("slug", { required: true })}
                                onInput={(e) => {
                                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                }}
                            />
                        </div>

                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                            <RTE
                                label="Content"
                                name="content"
                                control={control}
                                defaultValue={getValues("content")}
                            />
                        </div>
                    </div>

                    {/* Right — sidebar */}
                    <div className="w-full lg:w-72 space-y-5">

                        {/* Publish card */}
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Publish</h3>

                            <Select
                                options={["active", "inactive"]}
                                label="Status"
                                {...register("status", { required: true })}
                            />

                            <Button
                                type="submit"
                                bgColor={post ? "bg-emerald-500 hover:bg-emerald-400" : "bg-amber-500 hover:bg-amber-400"}
                                textColor="text-gray-900"
                                className="w-full font-bold py-3"
                            >
                                {post ? "✓ Update Post" : "✦ Publish Post"}
                            </Button>
                        </div>

                        {/* Featured image card */}
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Featured Image</h3>

                            {/* Custom file input */}
                            <label className="
                                flex flex-col items-center justify-center gap-2
                                w-full py-8 rounded-xl
                                border-2 border-dashed border-gray-700
                                hover:border-amber-500/50 hover:bg-amber-500/5
                                cursor-pointer transition-all duration-200
                                text-center
                            ">
                                <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm text-gray-500">Click to upload image</span>
                                <span className="text-xs text-gray-600">PNG, JPG, GIF</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    {...register("image", { required: !post })}
                                />
                            </label>

                            {/* Current image preview */}
                            {post && (
                                <div className="rounded-xl overflow-hidden border border-gray-700">
                                    <img
                                        src={service.getFilePreview(post.featuredImage)}
                                        alt={post.title}
                                        className="w-full object-cover"
                                    />
                                    <p className="text-xs text-gray-600 text-center py-2">Current image</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostForm
