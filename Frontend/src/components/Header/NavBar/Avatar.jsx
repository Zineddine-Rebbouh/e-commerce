import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Avatar = ( { src } ) => {
    const data = src;
    console.log( data );
    if ( src )
    {
        return <img
            src={ src }
            alt="Avatar"
            className='w-[50px] h-[50px] rounded-full border-[1px]'
        />;
    }
    return <FaUserCircle size={ 32 } />;
};

export default Avatar;
