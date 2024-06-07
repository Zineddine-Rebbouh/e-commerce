import React, { useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useQuery } from 'react-query';
import * as apiClient from '../../../api/api-Client';

const NotificationCount = () => {
    const [ showNotifications, setShowNotifications ] = useState( false );
    const [ notifications, setNotifications ] = useState( [
        { id: 1, message: 'Notification 1' },
        { id: 2, message: 'Notification 2' },
        { id: 3, message: 'Notification 3' },
    ] );

    const CartCounter = notifications.length;

    const handleNotificationClick = () => {
        setShowNotifications( !showNotifications );
    };

    const { data: notificationsData } = useQuery( "notifications", apiClient.getNotifications() );
    console.log( notificationsData );
    return (
        <div className='relative cursor-pointer z-50'>
            <div className='text-3xl' onClick={ handleNotificationClick }>
                <IoIosNotificationsOutline
                    size={ 32 }
                    color='white'
                    style={ { fontWeight: 'bold' } }
                />
            </div>
            <span className={ `${ CartCounter === 0 ? '' : 'bg-[#fff]' } absolute top-[-10px] right-[-10px] text-black h-6 w-6 rounded-full flex items-center justify-center text-sm` }>
                { CartCounter === 0 ? '' : CartCounter }
            </span>

            { showNotifications && (
                <div className="absolute top-12 mt-1 right-1/2 transform translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg w-[300px]">
                    <ul className="py-2 px-4">
                        { notifications.map( notification => (
                            <li key={ notification.id }>{ notification.message }</li>
                        ) ) }
                    </ul>
                </div>
            ) }
        </div>
    );
};

export default NotificationCount;
