import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Avatar = ( { src } ) => {
    if ( src )
    {
        return <img
            src={ src }
            alt="Avatar"
            className='rounded-full'
            height={ 40 }
            width={ 40 }
        />;
    }
    return <FaUserCircle size={ 32 } />;
};

export default Avatar;
