import React, { useState } from 'react'
import Container from '../../layout/Container'
import NavigationBar from './NavBar/NavigationBar'
import NotificationCount from './NavBar/NotificationCount'
import Favourites from './NavBar/Favourties'
import CartCount from './NavBar/CartCount'
import SearchBar from './NavBar/SearchBar'
import Avatar from './NavBar/Avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Categories from '../Categories/Categories'
import { categoriesData } from '../../constants/data'
import { IoIosArrowDown } from 'react-icons/io'
import { BiMenuAltLeft } from "react-icons/bi"

const Header = () => {
    const { user } = useSelector( ( state ) => state.user );
    const [ dropDown, setDropDown ] = useState( false )
    return (
        <div className=''>
            <NavigationBar />
            <div className='transition 800px:flex items-center justify-between w-full bg-[#fd6034]'>
                <Container >
                    <div className='flex justify-between items-center py-4 border-b-1 '>
                        <div onClick={ () => setDropDown( !dropDown ) }>
                            <div className="relative h-[50px] w-[280px] hidden lg:block  ">
                                <button
                                    className={ `h-[100%] w-full flex gap-12 items-center bg-white font-sans text-lg font-[500] select-none rounded-t-md` }
                                >
                                    <BiMenuAltLeft size={ 30 } />
                                    Select Categorie
                                    <IoIosArrowDown
                                        size={ 20 }
                                        className="cursor-pointer"
                                        onClick={ () => setDropDown( !dropDown ) }
                                    />
                                </button>
                                {
                                    dropDown ? <Categories categoriesData={ categoriesData }
                                        setDropDown={ setDropDown } /> : null
                                }
                            </div>
                        </div>
                        <div className={ 'flex justify-center' }>
                            <SearchBar />
                        </div>
                        <div className='flex items-center gap-3 md:gap-6'>
                            {/* <NotificationCount /> */ }
                            <Favourites />
                            <CartCount />
                            <Link to="/profile">
                                <Avatar src={ user?.avatar } />
                            </Link>
                        </div>
                    </div>
                </Container >
            </div>
        </div >
    )
}

export default Header
