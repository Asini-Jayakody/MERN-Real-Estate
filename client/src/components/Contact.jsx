import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({listing}) {
    const [landLoard, setLandLoard] = useState(null)
    const [message, setMessage] = useState('')

    useEffect(()=>{
        const fetchLandloard = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`)
                const data =  await res.json()
                setLandLoard(data)
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchLandloard()
    }, [listing.userRef])


  return (
    <div>
        {landLoard && (
            <div>
                <p>Contact <span className='font-semibold'>{landLoard.username}</span> for <span className='font-semibold'>{listing.name}</span> </p>
                <textarea name="message" id="message" rows='2' value={message} onChange={(e)=>setMessage(e.target.value)} className='w-full border p-3 rounded-lg' placeholder='Enter Your Message'></textarea>
                <Link
                    to={`mailto:${landLoard.email}?subject=Regarding ${listing.name}&body=${message}`}
                    className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                >
                    Send Message          
                </Link>
            </div>

            
        )}
    </div>
  )
}
