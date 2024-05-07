import React, { useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { TextField, Button, CircularProgress } from '@mui/material';
import Avatar from '../../Header/NavBar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../Loader/Loader';

const ShopProfile = () => {
    const dispatch = useDispatch();
    const { shop, isLoading } = useSelector( ( state ) => state.shop );
    const [ updatedShop, setUpdatedShop ] = useState( shop );

    const handleImage = ( e ) => {
        const file = e.target.files[ 0 ];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUpdatedShop( { ...updatedShop, avatar: reader.result } );
        };
        reader.readAsDataURL( file );
    };

    const handleChange = ( e ) => {
        const { name, value } = e.target;
        setUpdatedShop( { ...updatedShop, [ name ]: value } );
    };

    const handleSubmit = ( e ) => {
        e.preventDefault();
    };

    if ( isLoading ) return <Loader />;

    return (
        <div className="w-full border border-gray-100 p-4">
            <>
                <div className="flex justify-center w-full">
                    <div className="relative mt-5">
                        <Avatar src={ updatedShop?.avatar } widthImage={ 150 } heightImage={ 150 } />
                        <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                            <input type="file" id="image" className="hidden" onChange={ handleImage } />
                            <label htmlFor="image">
                                <AiOutlineCamera />
                            </label>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="w-full px-5 space-y-10">
                    <form onSubmit={ handleSubmit } aria-required={ true } className='space-y-10'>
                        <TextField
                            label="Full Name"
                            name="name"
                            variant="outlined"
                            fullWidth
                            required
                            value={ updatedShop.name }
                            onChange={ handleChange }
                            className="mb-4"
                        />
                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            value={ updatedShop.email }
                            onChange={ handleChange }
                            className="mb-4"
                        />
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            type="number"
                            variant="outlined"
                            fullWidth
                            required
                            value={ updatedShop.phoneNumber }
                            onChange={ handleChange }
                            className="mb-4"
                        />
                        <TextField
                            label="Address"
                            name="address"
                            variant="outlined"
                            fullWidth
                            required
                            value={ updatedShop.address }
                            onChange={ handleChange }
                            className="mb-4"
                        />
                        <TextField
                            label="Zip Code"
                            name="zipCode"
                            type="number"
                            variant="outlined"
                            fullWidth
                            required
                            value={ updatedShop.zipCode }
                            onChange={ handleChange }
                            className="mb-4"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={ isLoading }
                            startIcon={ isLoading ? <CircularProgress size={ 20 } color="inherit" /> : null }
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </>
        </div>
    );
};

export default ShopProfile;
