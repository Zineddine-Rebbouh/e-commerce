import React, { useState } from 'react'
import Container from '../../layout/Container'
import NavigationBar from '../NavBar/NavigationBar'
import styles from '../../utils/styles'
import { navItems } from '../../constants/data'
import { Link } from 'react-router-dom'

const Header = () => {
    const [ active, setActive ] = useState( false )
    return (
        <div className=''>
            <NavigationBar />
            <div className='transition 800px:flex items-center justify-between w-full bg-[#3321c8]'>
                <div className='py-6 border-b-1 '>
                    <Container>
                        <div className={ 'flex justify-center' }>
                            {
                                navItems && navItems.map( ( i, index ) => (
                                    <div className="flex">
                                        <Link to={ i.url }
                                            className={ ` ${ active === index + 1 ? "text-[#17dd1f]" : "text-white 800px:text-[#fff]" } 800px:pb-0 font-[500] px-6 cursor-pointer}` }
                                        >
                                            { i.title }
                                        </Link>
                                    </div>
                                ) )
                            }
                        </div>
                    </Container>
                </div>
            </div>
        </div >
    )
}

export default Header
