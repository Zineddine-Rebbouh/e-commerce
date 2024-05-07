import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../Header/NavBar/Avatar";
import { Loader } from "../Loader/Loader";
import { RxPerson } from "react-icons/rx";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineAdminPanelSettings, MdOutlineTrackChanges } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";

const ShopSidebar = ( { active, setActive } ) => {
    const { shop, isLoading } = useSelector( ( state ) => state.shop );

    if ( isLoading )
    {
        return <Loader />;
    }

    // Function to generate className based on active state
    const getClassName = ( index ) => ( active === index ? "text-red" : "" );

    return (
        <div className="w-full h-full flex flex-col gap-28 shadow-sm pt-8 border border-gray-100 text-white p-8">
            <div>
                <div className="flex justify-center w-full">
                    <div className="relative mt-5 flex gap-10 items-center border-2 p-2 w-full">
                        <img src={ shop?.avatar } alt="shop-avatar" className="w-14 h-14 rounded-md object-contain" />
                        <h1>{ shop.name }</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-cneter gap-4 ">
                <Link to="/shop" className={ `flex items-center text-center cursor-pointer w-full mb-8 ${ getClassName( 1 ) }` }>
                    <MdOutlineDashboard size={ 20 } color={ getClassName( 1 ) ? "red" : "" } />
                    <span className="pl-3 hidden md:block">Dashboard</span>
                </Link>
                <Link to="/shop/profile" className={ `flex items-center text-center cursor-pointer w-full mb-8 ${ getClassName( 2 ) }` }>
                    <RxPerson size={ 20 } color={ getClassName( 2 ) ? "red" : "" } />
                    <span className="pl-3 hidden md:block">Profile</span>
                </Link>
                <Link to="/shop/products" className={ `flex items-center cursor-pointer w-full mb-8 ${ getClassName( 3 ) }` }>
                    <AiOutlineMessage size={ 20 } color={ getClassName( 3 ) ? "red" : "" } />
                    <span className="pl-3 hidden md:block">Products</span>
                </Link>
                <Link to="/shop/events" className={ `flex items-center cursor-pointer w-full mb-8 ${ getClassName( 4 ) }` }>
                    <AiOutlineMessage size={ 20 } color={ getClassName( 4 ) ? "red" : "" } />
                    <span className="pl-3 hidden md:block">Events</span>
                </Link>
                <Link to="/shop/orders" className={ `flex items-center cursor-pointer w-full mb-8 ${ getClassName( 5 ) }` }>
                    <HiOutlineShoppingBag size={ 20 } color={ getClassName( 5 ) ? "red" : "" } />
                    <span className="pl-3 hidden md:block">Orders</span>
                </Link>
                <Link to="/shop/refunds" className={ `flex items-center cursor-pointer w-full mb-8 ${ getClassName( 6 ) }` }>
                    <HiOutlineReceiptRefund size={ 20 } color={ getClassName( 6 ) ? "red" : "" } />
                    <span className="pl-3 hidden md:block">Refunds</span>
                </Link>
            </div>
        </div>
    );
};

export default ShopSidebar;
