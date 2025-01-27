import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'


export default function Listing() {
    SwiperCore.use([Navigation]);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [listing, setListing] = useState(null)
    const params = useParams()

    useEffect(()=>{
        const fetchListing = async () => {
            setLoading(true)
            const res = await fetch(`/api/listing/get/${params.listingId}`)
            const data = await res.json()
            if (data.success === false){
                console.log(data.message)
                setLoading(false)
                setError(true)
                return
            }
            setLoading(false)
            setListing(data)
        }

        fetchListing()
    },[])
  return (
    <div>
        {loading && (<p className='text-center my-7 text-2xl'>Loading...</p>)}
        {error && (<p className='text-center my-7 text-2xl' >Something went wrong!</p>)}
        {listing && !loading && !error && (
            <div>
                <Swiper navigation>
                {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
                </Swiper>
            </div>
        )}
        
    </div>
  )
}
