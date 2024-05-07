import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineCamera } from 'react-icons/ai';
import { TextField, Button, Avatar } from '@mui/material';
import styles from '../../../utils/styles';

const CustomerProfile = () => {
    const { user } = useSelector( ( state ) => state.user );
    const [ name, setName ] = useState( user?.name || '' );
    const [ email, setEmail ] = useState( user?.email || '' );
    const [ phoneNumber, setPhoneNumber ] = useState( user?.phoneNumber || '' );
    const [ password, setPassword ] = useState( '' );
    const [ avatar, setAvatar ] = useState( null );

    const handleSubmit = ( e ) => {
        e.preventDefault();
        // Dispatch updateUserInformation action
    };

    if ( !user )
    {
        return <Loader />;
    }

    return (
        <div className="w-full border border-gray-100 bg-white h-full">
            <>
                <div className="flex justify-center w-full">
                    <div className="pt-8">
                        <Avatar
                            src={ user?.avatar }
                            sx={ { width: 150, height: 150 } }
                            alt=""
                        />
                        <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] mt-10 right-[5px]">
                            <input
                                type="file"
                                id="image"
                                className="hidden"
                            // onChange={handleImage}
                            />
                            <label htmlFor="image">
                                <AiOutlineCamera />
                            </label>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="w-full px-5">
                    <form onSubmit={ handleSubmit } aria-required={ true }>
                        <div className="w-full 800px:flex block pb-3 space-y-10">
                            <div className=" w-[100%] 800px:w-[50%]">
                                <TextField
                                    label="Full Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={ name }
                                    onChange={ ( e ) => setName( e.target.value ) }
                                />
                            </div>
                            <div className=" w-[100%] 800px:w-[50%]">
                                <TextField
                                    label="Email Address"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={ email }
                                    onChange={ ( e ) => setEmail( e.target.value ) }
                                />
                            </div>
                            <div className=" w-[100%] 800px:w-[50%]">
                                <TextField
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={ phoneNumber }
                                    onChange={ ( e ) => setPhoneNumber( e.target.value ) }
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                type="submit"
                                sx={ { mt: 3 } }
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </>
        </div>
    );
}

export default CustomerProfile;
