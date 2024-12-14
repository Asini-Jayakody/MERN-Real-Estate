import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage , ref, uploadBytes, uploadBytesResumable} from 'firebase/storage'
import app from '../firebase.js'

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser} = useSelector((state)=> state.user)
  const  [file,setFile] = useState(undefined)
  const [filePerc , setFilePerc] = useState(undefined)
  const [fileuploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  console.log(file)
  console.log(filePerc)
  console.log(formData)

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

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Profile</h1>
      <form className='flex flex-col gap-4'>
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
