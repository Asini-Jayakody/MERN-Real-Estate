import React, { useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import {useDispatch , useSelector} from'react-redux'
import {signInFaliure , signInSuccess, signInStart} from '../user/userSlice.js'
import OAuth from "../components/OAuth.jsx"

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state) => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id] : event.target.value
    })
  }
  console.log(formData)

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signInStart)
    try{
      const res = await fetch("/api/auth/signin",
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
        dispatch(signInFaliure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')

    }catch(error){
      dispatch(signInFaliure(error.message))  
    }
    
  }

  return (
    <div className='p-3 max-w-lg  mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign In</h1>
      <form className="flex flex-col gap-4 size-full" onSubmit={handleSubmit}>
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password'onChange={handleChange} />
        <button disabled= {loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
        <OAuth/>
      </form>
      <div className="flex gap-3 mt-5 justify-center">
        <p>Do not have an account?</p>
        <Link to='/signup'>
        <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}
