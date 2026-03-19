import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from "react-redux"
import authService from './appwrite/auth'
import { login, logout } from './Store/authSlice'
import { Header, Footer } from '../Components/index'
import { Outlet } from 'react-router-dom'
function App() {

  // loading state taki data fetch karo to dikhe ki abhi fetching ho rahi 

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {

      
      if (userData) {
        dispatch(login(userData ))
      }
      else {
        dispatch(logout())
      }
    }).catch(() => dispatch(logout()))
    .finally(() => setLoading(false))
}, [])


return !loading ? (
  <div className='min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
    <Header />
    <main className='flex-grow'>
      <Outlet/>
    </main>
    <Footer />
  </div>
) : (
  <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
    <div className='text-center'>
      <div className='w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
      <p className='text-gray-600 font-semibold text-lg'>Loading...</p>
    </div>
  </div>
)
  


  
}




export default App
