import React, { useState } from 'react'
import Container from '../../layout/Container'
import ShopSidebar from './ShopSidebar'
import ShopSections from './ShopSections'

const ShopProfile = () => {
    const [ active, setActive ] = useState( 'Shop informations' )
    return (
        <div className='p-8'>

            <div className="min-h-screen grid grid-cols-6 space-x-2">
                {/* ProfileSideBar will take 1 fraction of space */ }
                <div className="col-span-1 h-full">
                    <ShopSidebar active={ active } setActive={ setActive } />
                </div>
                {/* ProfileSections will take 3 fractions of space */ }
                <div className="col-span-5 h-full">
                    <ShopSections />
                </div>
            </div>

        </div >
    )
}

export default ShopProfile
