import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../src/appwrite/auth'
import { logout } from '../../src/Store/authSlice'

function LogoutButton() {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout()
            .catch((error) => console.log("Error", error))
            .finally(() => dispatch(logout()))
    }

    return (
        <button
            onClick={logoutHandler}
            className='
                flex items-center gap-1.5
                px-4 py-2 text-sm font-semibold
                text-red-400 border border-red-500/30
                rounded-lg bg-red-500/10
                hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-red-500/40
                active:scale-95
            '
        >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
        </button>
    )
}

export default LogoutButton
