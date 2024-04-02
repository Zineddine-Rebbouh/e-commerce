import React from 'react'
import { RxPerson } from 'react-icons/rx'
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
    MdOutlineAdminPanelSettings,
    MdOutlineTrackChanges,
} from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Avatar from '../Header/NavBar/Avatar';


const ShopSidebar = ( { active, setActive } ) => {
    const user = useSelector( ( state ) => state.user )

    const navigate = useNavigate()
    return (
        <div className="w-full h-full flex flex-col gap-3 bg-white shadow-sm rounded-[10px] p-4 pt-8 border border-gray-100">
            <div className='w-full h-[200px] flex justify-center items-center'>
                <Avatar src={ user.Avatar } className="" />
            </div>
            <div
                className="flex items-center text-center cursor-pointer w-full mb-8"
                onClick={ () => setActive( 1 ) }
            >
                <RxPerson size={ 20 } color={ active === 1 ? "red" : "" } />
                <span
                    className={ `pl-3 ${ active === 1 ? "text-[red]" : ""
                        } hidden md:block ` }
                >
                    Shop infos
                </span>
            </div>
            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={ () => setActive( 4 ) || navigate( "/inbox" ) }
            >
                <AiOutlineMessage size={ 20 } color={ active === 4 ? "red" : "" } />
                <span
                    className={ `pl-3 ${ active === 4 ? "text-[red]" : ""
                        } hidden md:block` }
                >
                    Prodcuts
                </span>
            </div>
            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={ () => setActive( 4 ) || navigate( "/inbox" ) }
            >
                <AiOutlineMessage size={ 20 } color={ active === 4 ? "red" : "" } />
                <span
                    className={ `pl-3 ${ active === 4 ? "text-[red]" : ""
                        } hidden md:block` }
                >
                    Events
                </span>
            </div>
            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={ () => setActive( 2 ) }
            >
                <HiOutlineShoppingBag size={ 20 } color={ active === 2 ? "red" : "" } />
                <span
                    className={ `pl-3 ${ active === 2 ? "text-[red]" : ""
                        } hidden md:block` }
                >
                    Orders
                </span>
            </div>
            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={ () => setActive( 3 ) }
            >
                <HiOutlineReceiptRefund size={ 20 } color={ active === 3 ? "red" : "" } />
                <span
                    className={ `pl-3 ${ active === 3 ? "text-[red]" : ""
                        } hidden md:block` }
                >
                    Refunds
                </span>
            </div>

            { user && user?.role === "Admin" && (
                <Link to="/admin/dashboard">
                    <div
                        className="flex items-center cursor-pointer w-full mb-8"
                        onClick={ () => setActive( 8 ) }
                    >
                        <MdOutlineAdminPanelSettings
                            size={ 20 }
                            color={ active === 7 ? "red" : "" }
                        />
                        <span
                            className={ `pl-3 ${ active === 8 ? "text-[red]" : ""
                                } hidden md:block` }
                        >
                            Admin Dashboard
                        </span>
                    </div>
                </Link>
            ) }
        </div>
    )
}

export default ShopSidebar
