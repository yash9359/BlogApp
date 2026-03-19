import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { login as authLogin } from "../src/Store/authSlice"
import { Button, Input, Logo } from "../Components/index"
import { useDispatch } from 'react-redux'
import authService from '../src/appwrite/auth';
import { useForm } from "react-hook-form"

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">

            {/* Background glow effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">

                {/* Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 md:p-10">

                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Logo width="auto" />
                    </div>

                    {/* Heading */}
                    <h2 className="text-center text-2xl font-bold text-white mb-1">
                        Welcome back
                    </h2>
                    <p className="text-center text-sm text-gray-500 mb-6">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-semibold text-amber-400 hover:text-amber-300 transition-colors duration-200"
                        >
                            Sign Up
                        </Link>
                    </p>

                    {/* Divider */}
                    <div className="border-t border-gray-800 mb-6" />

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
                            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(login)}>
                        <div className="space-y-5">
                            <Input
                                label="Email"
                                placeholder="you@example.com"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) =>
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Enter a valid email address",
                                    }
                                })}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password", { required: true })}
                            />

                            <Button
                                type="submit"
                                bgColor="bg-amber-500 hover:bg-amber-400"
                                textColor="text-gray-900"
                                className="w-full text-base font-bold py-3 mt-2"
                            >
                                Sign In →
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Bottom hint */}
                <p className="text-center text-xs text-gray-600 mt-6">
                    By signing in, you agree to our&nbsp;
                    <span className="text-gray-500 hover:text-gray-400 cursor-pointer">Terms</span>
                    &nbsp;&amp;&nbsp;
                    <span className="text-gray-500 hover:text-gray-400 cursor-pointer">Privacy Policy</span>
                </p>
            </div>
        </div>
    )
}

export default Login
