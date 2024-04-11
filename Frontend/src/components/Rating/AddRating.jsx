import React from 'react'
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import * as apiClient from '../../api/api-Client'
import { useParams } from 'react-router-dom';

const AddRating = () => {
    const [ rating, setRating ] = useState( 0 );
    const [ comment, setComment ] = useState( '' );
    const [ isLoading, setIsLoading ] = useState( false );


    const { id } = useParams();

    const handleSumbit = async () => {

        setIsLoading( true );

        let data = {};
        data.rating = rating;
        data.comment = comment

        await apiClient.createReview( id, data )
            .then( ( response ) => {
                console.log( response );
            } )
            .catch( ( error ) => {
                console.log( error );
            } )

        setTimeout( () => {
            setIsLoading( false );
        }, 2000 );
    }

    return (
        <div className='flex flex-col gap-2 max-w-[500px] py-5'>
            <h1 className='text-2xl font-bold'>Add Rating</h1>
            <Rating
                name="simple-controlled"
                value={ rating }
                onChange={ ( event, newValue ) => {
                    setRating( newValue );
                } }
            />
            <textarea rows={ 3 } className='border-none   bg-gray-100 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                type="text"
                name="comment"
                id="comment"
                placeholder='Add your comment'
                value={ comment }
                onChange={ ( e ) => {
                    setComment( e.target.value );
                } }
            />
            <button
                onClick={ () => handleSumbit() }
                className='w-[100px] bg-blue-500 text-white px-4 py-2 rounded-md'>
                { isLoading ? 'Loading...' : 'Submit' }
            </button>
        </div>
    )
}

export default AddRating
