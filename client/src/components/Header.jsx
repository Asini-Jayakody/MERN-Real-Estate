// import {FaSearch} from 'react-icons'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Header() {
    const {currentUser} = useSelector((state) => state.user)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('search', searchTerm);
        const searchQuary = urlParams.toString()
        navigate(`/search?${searchQuary}`)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const search = urlParams.get('search');
        if (search) {
            setSearchTerm(search);
        }
    }, [window.location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Araliya</span>
                    <span className='text-slate-700'>Estate</span>
                </h1>
            </Link>
            
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                <button onClick={handleSubmit}>Search</button>
            </form>

            <ul className="flex gap-4">
                <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:text-slate-900'>Home</li>
                </Link>
                <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:text-slate-900'>About</li>
                </Link>
                <Link to='/profile'>
                {currentUser ? (
                    <img className='rounded-full h-7 w-7 object-cover'  src={currentUser.avatar} alt="profile" />
                ) : (
                    <li className='sm:inline text-slate-700 hover:text-slate-900'>Sign In</li>

                )}
                </Link>
            </ul>
        </div>
        
    </header>
  )
}
