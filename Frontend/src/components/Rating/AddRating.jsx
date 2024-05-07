import React from 'react';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as apiClient from '../../api/api-Client';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

const AddRating = () => {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ rating, setRating ] = useState( 0 );
    const [ isLoading, setIsLoading ] = useState( false );

    const { mutate } = useMutation( apiClient.addRating, {
        onSuccess: ( data ) => {
            console.log( "Rating added:", data );
        }
    } );

    const onSubmit = async ( formData ) => {
        setIsLoading( true );
        const dataToSend = { rating, ...formData }; // Include rating in formData
        mutate( { id, dataToSend } );
        setIsLoading( false );
    };

    const handleRatingChange = ( event, newValue ) => {
        setRating( newValue );
    };

    return (
        <div className='flex flex-col gap-2 max-w-[500px] py-5'>
            <h1 className='text-2xl font-bold'>Add Rating</h1>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <Rating
                    name="rating"
                    value={ rating }
                    onChange={ handleRatingChange }
                />
                { errors.rating && <span className="text-red-500">Rating is required</span> }
                <textarea
                    rows={ 3 }
                    className='border-none bg-gray-100 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    { ...register( "comment", { required: true } ) }
                    placeholder='Add your comment'
                />
                { errors.comment && <span className="text-red-500">Comment is required</span> }
                <button
                    type="submit"
                    className='w-[100px] bg-blue-500 text-white px-4 py-2 rounded-md'
                    disabled={ isLoading }
                >
                    { isLoading ? 'Loading...' : 'Submit' }
                </button>
            </form>
        </div>
    );
};

export default AddRating;
