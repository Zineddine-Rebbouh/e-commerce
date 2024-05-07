import React from 'react'
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md'

const ShopNavbar = () => {
    return (
        <div className={ 'p-5 rounded-sm bg-white flex items-center justify-between border border-gray-200' }>
            <div className={ 'text-black font-bold capitalize text-xl' }>Dashboard</div>
            <div className={ 'flex items-center gap-5 ' }>
                <div className={ 'flex items-center gap-2.5 p-2.5 rounded-md bg-[#2e374a] ' }>
                    <MdSearch />
                    <input type="text" placeholder="Search..." className={ 'bg-transparent border-none text-white ' } />
                </div>
                <div className={ 'flex gap-5' }>
                    <MdOutlineChat size={ 20 } />
                    <MdNotifications size={ 20 } />
                    <MdPublic size={ 20 } />
                </div>
            </div>
        </div>
    )
}

export default ShopNavbar
