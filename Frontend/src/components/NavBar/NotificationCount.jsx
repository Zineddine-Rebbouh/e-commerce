import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";

const NotificationCount = () => {
    return (
        <div
            className='relative cursor-pointer'
            onClick={ () => {
            } }
        >
            <div className='text-3xl'>
                <IoIosNotificationsOutline size={ 32 } />
            </div>
            <span className='absolute
            top-[-10px] right-[-10px] bg-[#222] text-white h-6 w-6 rounded-full flex items-center justify-center text-sm
            '>
                7
            </span>

        </div>
    )
}

export default NotificationCount
