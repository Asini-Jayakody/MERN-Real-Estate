import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [sideBarParams, setSideBarParams] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc' 
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.id === 'searchTerm'){
            setSideBarParams({...sideBarParams, searchTerm:e.target.value})
        }

        if (e.target.id === 'all' || e.target.id === 'Rent' || e.target.id === 'Sale'){
            setSideBarParams({...sideBarParams, type:e.target.id})
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSideBarParams({...sideBarParams, [e.target.id]:e.target.checked})
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';

            const order = e.target.value.split('_')[1] || 'desc';

            setSideBarParams({ ...sideBarParams, sort, order });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams();
        urlParams.set('search', sideBarParams.searchTerm);
        urlParams.set('type', sideBarParams.type);
        urlParams.set('parking', sideBarParams.parking);
        urlParams.set('furnished', sideBarParams.furnished);
        urlParams.set('offer', sideBarParams.offer);
        urlParams.set('sort', sideBarParams.sort);
        urlParams.set('order', sideBarParams.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('search');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSideBarParams({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            const response = await fetch(`/api/listing/get?${urlParams.toString()}`);
            if (!response.ok) {
                console.error('Failed to fetch listings');
                return;
            }
            const data = await response.json();
            console.log(data)
            // Handle the fetched listings data as needed
        }
        fetchListings();
    }, [location.search]);

    
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              onChange={handleChange}
              value={sideBarParams.searchTerm}
              className='border rounded-lg p-3 w-full'
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input type='checkbox' id='all' onChange={handleChange} checked={sideBarParams.type === 'all'} className='w-5' />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='Rent' onChange={handleChange} checked={sideBarParams.type === 'Rent'} className='w-5' />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='Sale' onChange={handleChange} checked={sideBarParams.type === 'Sale'} className='w-5' />
              <span>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' onChange={handleChange} checked={sideBarParams.offer} className='w-5' />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input type='checkbox' id='parking' onChange={handleChange} checked={sideBarParams.parking} className='w-5' />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' onChange={handleChange} checked={sideBarParams.furnished} className='w-5' />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select id='sort_order' onChange={handleChange} defaultValue={'created_at_desc'} className='border rounded-lg p-3'>
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAT_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className=''>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
      </div>
    </div>
  );
}