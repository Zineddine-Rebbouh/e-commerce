import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../utils/styles";
import Avatar from "../Header/NavBar/Avatar";
import { useEffect } from "react";
import { getShopDetails } from "../../redux/actions/shop";
import { Loader } from "../Loader/Loader";
import Products from "./sections/Products";
import Orders from "./sections/Orders";

const ShopSections = ( { active } ) => {
  const { user } = useSelector( ( state ) => state.user );
  const { shop, isLoading } = useSelector( ( state ) => state.shop );
  const [ name, setName ] = useState( shop && shop.name );
  const [ description, setDescription ] = useState( shop && shop.description );
  const [ email, setEmail ] = useState( shop && shop.email );
  const [ address, setAddress ] = useState( shop && shop.address );
  const [ zipCode, setZipCode ] = useState( shop && shop.zipCode );
  const [ phoneNumber, setPhoneNumber ] = useState( 0 );
  const [ avatar, setAvatar ] = useState( null );
  const dispatch = useDispatch();

  const handleSubmit = ( e ) => {
    // e.preventDefault();
    // dispatch( updateUserInformation( name, email, phoneNumber, password ) );
  };

  const handleImage = async ( e ) => {
    const reader = new FileReader();

    reader.onload = () => {
      if ( reader.readyState === 2 )
      {
        setAvatar( reader.result );
        axios
          .put(
            `${ server }/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then( ( response ) => {
            dispatch( loadUser() );
            toast.success( "avatar updated successfully!" );
          } )
          .catch( ( error ) => {
            toast.error( error );
          } );
      }
    };

    reader.readAsDataURL( e.target.files[ 0 ] );
  };

  console.log( shop );

  if ( isLoading )
  {
    return <Loader />;
  }

  if ( active == 2 )
  {
    return (
      <div className="w-full border border-gray-100">
        <Products />
      </div>
    );
  }

  if ( active == 3 )
  {
    return (
      <div className="w-full h-full border border-gray-100">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-3xl font-bold">Events</h1>
        </div>
      </div>
    );
  }


  if ( active == 5 )
  {
    return (
      <div className="w-full border border-gray-100">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-3xl font-bold">Refunds</h1>
        </div>
      </div>
    );
  }

};

export default ShopSections;
