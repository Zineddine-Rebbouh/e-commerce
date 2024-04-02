import React, { useState } from 'react'
import ProfileSideBar from './ProfileSideBar'
import ProfileSections from './ProfileSections'
import Container from '../../layout/Container'

const ProfileCustomer = () => {
    const [ active, setActive ] = useState( 'profile' )
    return (
        <div className='p-8'>
            <Container>
                <div className="grid grid-cols-6 space-x-2">
                    {/* ProfileSideBar will take 1 fraction of space */ }
                    <div className="col-span-1">
                        <ProfileSideBar active={ active } setActive={ setActive } />
                    </div>
                    {/* ProfileSections will take 3 fractions of space */ }
                    <div className="col-span-5">
                        <ProfileSections />
                    </div>
                </div>
            </Container>
        </div >
    )
}

export default ProfileCustomer
