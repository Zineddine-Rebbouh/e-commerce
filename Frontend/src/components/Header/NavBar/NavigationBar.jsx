import React, { useState } from 'react'
import Container from '../../../layout/Container'
import SearchBar from './SearchBar'
import Avatar from './Avatar'
import CartCount from './CartCount'
import NotificationCount from './NotificationCount'
import Favourites from './Favourties'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from '../../../utils/styles'
import { navItems } from '../../../constants/data'

const NavigationBar = () => {
    const [ active, setActive ] = useState( false )
    const { isAuthenticated, user } = useSelector( ( state ) => state.user );
    console.log( isAuthenticated );
    return (
        <div className='
        sticky top-0 w-full bg-slate-200 z-30 shadow-sm'>
            <div className='py-3 border-b-1 '>
                <Container>
                    <div className='flex items-center justify-between gap-3 md-g ap-0'>
                        <a href="/" className='font-bold text-3xl'>E-commerce</a>
                        <div className='hidden md:flex  '>
                            {
                                navItems && navItems.map( ( i, index ) => (
                                    <div className="flex">
                                        <Link to={ i.url }
                                            className={ ` ${ active === index + 1 ? "text-[#17dd1f]" : "text-black  800px:text-[#fff]" } 800px:pb-0 font-[600] px-6 cursor-pointer }` }
                                        >
                                            { i.title }
                                        </Link>
                                    </div>
                                ) )
                            }
                        </div>
                        <div className='flex items-center gap-3 md:gap-6'>
                            { isAuthenticated ? (
                                <div>
                                    <Link
                                        to="/create-seller"
                                        className="text-[18px] text-white border-1 border-[#000000b7] px-4 py-2 rounded-md bg-black"
                                    >
                                        &raquo; Apply for Seller
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        to="/sign-in"
                                        className="text-[18px] text-[#000000b7] border-[#000000b7] px-4 py-2 rounded-md font-bold"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        to="/sign-up"
                                        className="text-[18px] text-white border-1 border-[#000000b7] px-4 py-2 rounded-md bg-black"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            ) }
                        </div>
                    </div>
                </Container>
            </div >
        </div >
    )
}

export default NavigationBar
