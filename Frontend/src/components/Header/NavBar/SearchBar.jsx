import React from 'react'
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {
    return (
        <div className='flex items-center w-full px-10'>
            <input type="text" autoComplete='off' placeholder='Search you product'
                className='p-2 border border-gray-300 rounded-l-md foucs:outline-none focus:border-[0.5px] focus:border-slate-500 w-full'
            />
            <button className='bg-white hover:opacity-80 text-white p-2 rounded-r-md'>
                <IoSearchSharp size={ 26 } color='#222' />
            </button>
        </div>
    )
}

export default SearchBar
