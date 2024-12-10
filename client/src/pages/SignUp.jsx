import React, { useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import OAuth from "../components/OAuth"

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id] : event.target.value
    })
  }
  console.log(formData)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    try{
      const res = await fetch("/api/auth/signup",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      )
      const data = await res.json()
      if (data.success === false) {
        setError(data.message)
        setLoading(false)
        return
      }
      setLoading(false)
      setError(null)
      navigate('/signin')

    }catch(error){
      setLoading(false)
      setError(error.message)
      
    }
    
  }

  return (
    <div className='p-3 max-w-lg  mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign Up</h1>
      <form className="flex flex-col gap-4 size-full" onSubmit={handleSubmit}>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password'onChange={handleChange} />
        <button disabled= {loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
        <OAuth/>
      </form>
      <div className="flex gap-3 mt-5 justify-center">
        <p>Have an account?</p>
        <Link to='/signin'>
        <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}
