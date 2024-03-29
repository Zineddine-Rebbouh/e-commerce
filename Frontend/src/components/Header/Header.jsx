import React, { useState } from 'react'
import Container from '../../layout/Container'
import NavigationBar from './NavBar/NavigationBar'
import styles from '../../utils/styles'
import { navItems } from '../../constants/data'
import { Link } from 'react-router-dom'
import NotificationCount from './NavBar/NotificationCount'
import Favourites from './NavBar/Favourties'
import CartCount from './NavBar/CartCount'

const Header = () => {
    const [ active, setActive ] = useState( false )
    return (
        <div className=''>
            <NavigationBar />
            <div className='transition 800px:flex items-center justify-between w-full bg-[#fd6034]'>
                <Container >
                    <div className='flex justify-between items-center py-6 border-b-1 '>

                        <div className={ 'flex justify-center' }>
                            {
                                navItems && navItems.map( ( i, index ) => (
                                    <div className="flex">
                                        <Link to={ i.url }
                                            className={ ` ${ active === index + 1 ? "text-[#17dd1f]" : "text-white  800px:text-[#fff]" } 800px:pb-0 font-[600] px-6 cursor-pointer }` }
                                        >
                                            { i.title }
                                        </Link>
                                    </div>
                                ) )
                            }
                        </div>
                        <div className='flex gap-3 md:gap-6'>
                            <NotificationCount />
                            <Favourites />
                            <CartCount />
                        </div>
                    </div>
                </Container >
            </div>
        </div >
    )
}

export default Header
