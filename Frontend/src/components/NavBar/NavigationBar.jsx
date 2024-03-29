import React from 'react'
import Container from '../../layout/Container'
import SearchBar from './SearchBar'
import Avatar from './Avatar'
import CartCount from './CartCount'
import NotificationCount from './NotificationCount'
import Favourites from './Favourties'

const NavigationBar = () => {
    return (
        <div className='
        sticky top-0 w-full bg-slate-200 z-30 shadow-sm'>
            <div className='py-4 border-b-1 '>
                <Container>
                    <div className='flex items-center justify-between gap-3 md-g ap-0'>
                        <a href="/" className='font-bold text-3xl'>E-commerce</a>
                        <div className='hidden md:block '>
                            <SearchBar />
                        </div>
                        <div className='flex items-center gap-6 md:gap-9'>
                            <NotificationCount />
                            <Favourites />
                            <CartCount />
                            <Avatar />
                        </div>
                    </div>
                </Container>
            </div >
        </div >
    )
}

export default NavigationBar
