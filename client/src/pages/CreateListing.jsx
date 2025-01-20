import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React , {useState} from 'react'
import app from '../firebase'

export default function CreateListing() {
  const [files,setFiles] = useState([])
  const [formData, setFormData] = useState({
    imageUrls: []
  })
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false)
  console.log(files)
  console.log(formData)
  const handleImagesSubmit = (event) => {
    if(files.length > 0 && files.length  + formData.imageUrls.length< 7 ){
      setUploading(true)
      const promises = []
      for (let i=0; i < files.length; i++){
        promises.push(storeImage(files[i]))
      }

      Promise.all(promises).then((urls) => {
        setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)
        })
        setImageUploadError(false)
        setUploading(false)
      }).catch((error) => {
        setImageUploadError('Image upload failed. (2 mb max per image)')
        setUploading(false)
      })
    }else if(files.length == 0){
      setImageUploadError('You shoul at least upload one image.')
      setUploading(false)
    }else{
      setImageUploadError('You can only upload 6 images per listing.')
      setUploading(false)
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve,reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("progress ",progress)
        },
        (error) => {
          reject(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
            resolve({...formData, imageUrls:downloadURL}))
        })
      })
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter(( _ , i) => i !==index)
    })
  }
  return (
    <div className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold my-7 text-center'>Create Listing</h1>
          <form className='flex flex-col sm:flex-row  gap-5'>
            <div className='flex flex-col gap-4 flex-1'>
              <input type="text" placeholder='Name' className='p-3 border rounded-lg'  
              id='name' maxLength='62' minLength='10' required/>
              <textarea type="text" placeholder='Description' className='p-3 border rounded-lg'  
              id='description' required/>
              <input type="text" placeholder='Address' className='p-3 border rounded-lg'  
              id='address' required/>
              <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-1'>
                  <input type="checkbox" id='Sale'  className='w-5'/>
                  <span>Sell</span>
                </div>
                <div className='flex gap-1'>
                  <input type="checkbox" id='Rent'  className='w-5'/>
                  <span>Rent</span>
                </div>
                <div className='flex gap-1'>
                  <input type="checkbox" id='Parking'  className='w-5'/>
                  <span>Parking</span>
                </div>
                <div className='flex gap-1'>
                  <input type="checkbox" id='Furnished'  className='w-5'/>
                  <span>Furnished</span>
                </div>
                <div className='flex gap-1'>
                  <input type="checkbox" id='Offer'  className='w-5'/>
                  <span>Offer</span>
                </div>
                <div className='flex flex-wrap gap-4'>
                  <div className='flex gap-1 items-center'>
                    <input type="number" id='bedrooms' min={1} max={10} required 
                    className='p-2 border border-gray-300 rounded-lg'/>
                    <span>Bedrooms</span>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <input type="number" id='bathrooms' min={1} max={10} required 
                    className='p-2 border border-gray-300 rounded-lg'/>
                    <span>Bathrooms</span>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <input type="number" id='regular price' min={1} max={10} required 
                    className='p-2 border border-gray-300 rounded-lg'/>
                    <div className='flex flex-col items-center'>
                      <span>Regular Price</span>
                      <span>($/month)</span>
                    </div>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <input type="number" id='discount price' min={1} max={10} required 
                    className='p-2 border border-gray-300 rounded-lg'/>
                    <div className='flex flex-col items-center'>
                      <span>Discount Price</span>
                      <span>($/month)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
              <p className='font-semibold'>Images:
                <span className='font-normal text-slate-600'>The first image will be cover (max 6)</span>
              </p>
              <div className='flex gap-2'>
                <input onChange={(e)=>setFiles(e.target.files)} type="file" id='images' accept='image/*' multiple required className='border p-2' />
                <button disabled={uploading} type='button' onClick={handleImagesSubmit} className='border border-green-800 p-2 rounded-lg
                hover:shadow-lg disabled:opacity-30 uppercase text-green-800'>{uploading ? 'Uploading': 'Upload'}</button>
              </div>
              <p className='text-red-600'>{imageUploadError && imageUploadError}</p>
              {
                formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => (
                  <div key={url} className='flex flex-col justify-between'>
                    <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg'/>
                    <button onClick={() => handleRemoveImage(index)} type='button' className='text-red-600 uppercase'>Delete</button>
                  </div>
                ))
              }
              <button className='bg-slate-800 p-3 rounded-lg text-white 
              hover:opacity-80 uppercase'>Create Listing</button>
            </div>
            
          </form>
        
    </div>
  )
}
