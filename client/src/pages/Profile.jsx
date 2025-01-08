import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage , ref, uploadBytes, uploadBytesResumable} from 'firebase/storage'
import app from '../firebase.js'
import { updateUserStart, updateUserSuccess, updateUserFaliure, deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../user/userSlice.js'
import { useDispatch } from 'react-redux'

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector((state)=> state.user)
  const  [file,setFile] = useState(undefined)
  const [filePerc , setFilePerc] = useState(undefined)
  const [fileuploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  console.log(file)
  console.log(filePerc)
  console.log(formData)
  const dispatch = useDispatch()

  console.log(`api/user/update/${currentUser._id}`)
  useEffect(()=> {
    if(file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
        console.log("progress ",progress)
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
          setFormData({...formData, avatar:downloadURL}))
      }
    )

  }

  const handleOnchange = (event) => {
    setFormData({
      ...formData,
      [event.target.id] : event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(updateUserStart())
    try {
      const res = await fetch(`api/user/update/${currentUser._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      )
      const data = await res.json()
      if (data.success === false){
        dispatch(updateUserFaliure(data))
        return
      }
      dispatch(updateUserSuccess(data))
      
    } catch (error) {
      dispatch(updateUserFaliure(error.message))
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`api/user/delete/${currentUser._id}`,
        {method: 'DELETE'}
      )

      const data = res.json()
      if (data.success===false){
        dispatch(deleteUserFailure(data))
        return
      }
      dispatch(deleteUserSuccess(data))
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={(event)=>setFile(event.target.files[0])} type="file" ref={fileRef} hidden accept='image/.*'/>
        <img onClick={()=>fileRef.current.click()} src={formData ? formData.avatar : currentUser.avatar} alt="profile" className='rounded-full h-20 w-20 object-cover self-center cursor-pointer' />
        <p className='self-center'> 
          {fileuploadError ? ( 
            <span className='text-red-500'>
              Error in image upload!
            </span> )
            : filePerc > 0 && filePerc < 100 ? (
              <span>{`Uploading ${filePerc}%`}</span>
            ): filePerc==100 ? (
              <span className='text-green-700'>Image Successfully uploaded!</span>
            ) : (
              ""
            )}
        </p>
        <input type="text" placeholder='username' id='username' defaultValue={currentUser.username} className='p-3 border rounded-lg'  onChange={handleOnchange}/>
        <input type="text" placeholder='email' id='email' defaultValue={currentUser.email} className='p-3 border rounded-lg' onChange={handleOnchange}/>
        <input type="password" placeholder='password' id='password' className='p-3 border rounded-lg' onChange={handleOnchange}/>
        <button disabled={loading} className='uppercase bg-slate-800 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>{loading? 'Updating...' : 'Update'}</button>
      </form>
      <div className=' flex text-red-500 justify-between mt-4 cursor-pointer'>
        <span onClick={handleDelete}>Delete Account</span>
        <span>Sign Out</span>
      </div>

      <p className='text-red-500 mt-5'>{error ? error.message : ''}</p>
      <p className='text-green-600 mt-5'>{(updateUserSuccess && error==null)? 'User updated successfully! ' : ''}</p>
    </div>
  )
}
