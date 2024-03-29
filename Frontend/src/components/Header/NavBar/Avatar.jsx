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
            className='w-[60px] h-[60px] rounded-full border-[3px]'
        />;
    }
    return <FaUserCircle size={ 32 } />;
};

export default Avatar;
