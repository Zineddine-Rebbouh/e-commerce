import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../utils/styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const SellerForm = () => {

    const [ avatar, setAvatar ] = useState();
    const [ visible, setVisible ] = useState( false );


    const { user } = useSelector( ( state ) => state.user );

    const { register, watch, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = handleSubmit( ( data ) => {
        console.log( data )
    } )

    const handleFileInputChange = ( e ) => {
        const reader = new FileReader();

        reader.onload = () => {
            if ( reader.readyState === 2 )
            {
                setAvatar( reader.result );
            }
        };

        reader.readAsDataURL( e.target.files[ 0 ] );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register as a seller
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={ onSubmit }>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Shop Name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="name"
                                    name="name"
                                    { ...register( "name", { required: "This field is required" } ) }
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                { errors.name && <span className="text-red-400"> { errors.name.message }</span>
                                }
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="phone-number"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="phoneNumber"
                                    { ...register( "phoneNumber", { required: "This field is required" } ) }
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                { errors.phoneNumber && <span className="text-red-400"> { errors.phoneNumber.message }</span>
                                }
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    { ...register( "email", { required: "This field is required" } ) }
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {
                                    errors.email && <span className="text-red-400"> { errors.email.message }</span>
                                }
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="address"
                                    name="address"
                                    { ...register( "address", { required: "This field is required" } ) }
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {
                                    errors.address && <span className="text-red-400"> { errors.address.message }</span>
                                }
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Zip Code
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="zipcode"
                                    { ...register( "zipcode", { required: "This field is required" } ) }
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {
                                    errors.zipcode && <span className="text-red-400"> { errors.zipcode.message }</span>
                                }
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type={ visible ? "text" : "password" }
                                    name="password"
                                    { ...register( "password", { required: "This field is required" } ) }
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {
                                    errors.password && <span className="text-red-400"> { errors.password.message }</span>
                                }
                                { visible ? (
                                    <AiOutlineEye
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={ 25 }
                                        onClick={ () => setVisible( false ) }
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={ 25 }
                                        onClick={ () => setVisible( true ) }
                                    />
                                ) }
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="avatar"
                                className="block text-sm font-medium text-gray-700"
                            ></label>
                            <div className="mt-2 flex items-center">
                                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                                    { avatar ? (
                                        <img
                                            src={ avatar }
                                            alt="avatar"
                                            className="h-full w-full object-cover rounded-full"
                                        />
                                    ) : (
                                        <RxAvatar className="h-8 w-8" />
                                    ) }
                                </span>
                                <label
                                    htmlFor="file-input"
                                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        type="file"
                                        name="avatar"
                                        id="file-input"
                                        onChange={ handleFileInputChange }
                                        { ...register( "avatar" ) }
                                        className="sr-only"
                                    />
                                    {
                                        errors.email && <span className="text-red-400"> { errors.email.message }</span>
                                    }
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                        <div className={ `${ styles.noramlFlex } w-full` }>
                            <h4>Already have an account?</h4>
                            <Link to="/shop-login" className="text-blue-600 pl-2">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellerForm;
