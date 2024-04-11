import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../utils/styles";
import Avatar from "../Header/NavBar/Avatar";
import { Loader } from "../Loader/Loader";
import Orders from "./sections/Orders";

const ProfileSections = ( { active } ) => {
  const { user } = useSelector( ( state ) => state.user );
  const [ name, setName ] = useState( user && user.name );
  const [ email, setEmail ] = useState( user && user.email );
  const [ phoneNumber, setPhoneNumber ] = useState( 0 );
  const [ password, setPassword ] = useState( "" );
  const [ avatar, setAvatar ] = useState( null );
  const dispatch = useDispatch();

  console.log( user );
  const handleSubmit = ( e ) => {
    // e.preventDefault();
    // dispatch( updateUserInformation( name, email, phoneNumber, password ) );
  };

  if ( !user )
  {
    return <Loader />;
  }

  if ( active == 2 )
  {
    return (
      <div className="flex justify-center items-center h-full p-4 w-full shadow-md">
        <Orders />;
      </div>
    );
  }

  if ( active == 3 )
  {
    return (
      <div className="w-full border border-gray-100 bg-white h-full">
        <>Refund</>
      </div>
    );
  }

  if ( active == 4 )
  {
    return (
      <div className="w-full border border-gray-100 bg-white h-full">
        <>Box</>
      </div>
    );
  }

  if ( active == 5 )
  {
    return (
      <div className="w-full border border-gray-100 bg-white h-full">
        <>Tracker Order</>
      </div>
    );
  }

  return (
    <div className="w-full border border-gray-100 bg-white h-full">
      <>
        <div className="flex justify-center w-full">
          <div className="pt-8">
            <img
              src={ `${ user?.avatar }` }
              className="w-[150px] h-[150px] rounded-full object-cover border-[3px] "
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
            <div className="w-full 800px:flex block pb-3">
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Full Name</label>
                <input
                  type="text"
                  className={ `${ styles.input } !w-[95%] mb-4 800px:mb-0` }
                  required
                  value={ user.name }
                  onChange={ ( e ) => setName( e.target.value ) }
                />
              </div>
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Email Address</label>
                <input
                  type="text"
                  className={ `${ styles.input } !w-[95%] mb-1 800px:mb-0` }
                  required
                  value={ user.email }
                  onChange={ ( e ) => setEmail( e.target.value ) }
                />
              </div>
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pt-2">Phone Number</label>
                <input
                  type="text"
                  className={ `${ styles.input } !w-[95%] mb-1 800px:mb-0` }
                  required
                  value={ user.phoneNumber }
                  onChange={ ( e ) => setPhoneNumber( e.target.value ) }
                />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <input
                className={ `w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer` }
                required
                value="Update"
                type="submit"
              />
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default ProfileSections;
