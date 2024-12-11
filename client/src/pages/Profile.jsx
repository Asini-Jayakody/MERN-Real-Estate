import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className='rounded-full h-20 w-20 object-cover self-center' />
        <input type="text" placeholder='username' id='username' className='p-3 border rounded-lg'/>
        <input type="text" placeholder='email' id='email' className='p-3 border rounded-lg'/>
        <input type="text" placeholder='password' id='password' className='p-3 border rounded-lg'/>
        <button className='uppercase bg-slate-800 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className=' flex text-red-500 justify-between mt-4 cursor-pointer'>
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  )
}
