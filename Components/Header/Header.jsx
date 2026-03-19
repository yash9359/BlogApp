import React, { useState } from 'react'
import Container from "../Container/Container.jsx"
import Logo from "../Logo.jsx"
import LogoutButton from "./LogoutButton.jsx"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false)

    const navItems = [
        { name: 'Home', slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Sign Up", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ]

    return (
        <header className='sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800'>
            <Container>
                <nav className='flex items-center h-16'>

                    {/* Logo */}
                    <Link to="/" className='mr-auto'>
                        <Logo width="auto" />
                    </Link>

                    {/* Desktop Nav */}
                    <ul className='hidden md:flex items-center gap-1'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='px-4 py-2 text-sm font-medium text-gray-400 rounded-lg
                                            transition-all duration-200
                                            hover:text-white hover:bg-gray-800
                                            focus:outline-none focus:ring-2 focus:ring-amber-500/50'
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <li className='ml-2'>
                                <LogoutButton />
                            </li>
                        )}
                    </ul>

                    {/* Mobile toggle */}
                    <button
                        className='md:hidden p-2 text-gray-400 hover:text-white transition-colors'
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className='md:hidden border-t border-gray-800 py-3'>
                        <ul className='flex flex-col gap-1'>
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => { navigate(item.slug); setMobileOpen(false) }}
                                            className='w-full text-left px-4 py-2.5 text-sm font-medium text-gray-400
                                                hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200'
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null
                            )}
                            {authStatus && (
                                <li className='px-2 pt-1'>
                                    <LogoutButton />
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </Container>
        </header>
    )
}

export default Header
