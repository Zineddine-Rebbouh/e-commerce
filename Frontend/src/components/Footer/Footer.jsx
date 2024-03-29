import React from 'react'
import Container from '../../layout/Container'
import { MdFacebook } from 'react-icons/md'
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai'

const Footer = () => {
    // 5542F6
    return (
        <footer className='bg-[#222]
        text-slate-200 text-sm mt-16
        '>
            <Container>
                <div className='flex flex-col md:flex-row justify-between pt-16 pb-8 '>
                    <div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6 flex flex-col gap-2'>
                        <h3 className='text-base font-bold mb-2'>
                            Shop Categories
                        </h3>
                        <a href="#">Shop Categories</a>
                        <a href="#">Lorem</a>
                        <a href="#">Lorem</a>
                        <a href="#">Lorem</a>
                        <a href="#">Lorem</a>
                        <a href="#">Lorem</a>
                        <a href="#">Others</a>
                    </div>
                    <div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6 flex flex-col gap-2'>
                        <h3 className='text-base font-bold mb-2'>
                            Customer Services
                        </h3>
                        <a href="#">Contact Us</a>
                        <a href="#">Shipping Policy</a>
                        <a href="#">Return & Refunds</a>
                        <a href="#">Watches</a>
                        <a href="#">FAQs</a>
                    </div>
                    <div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6 flex flex-col gap-2'>
                        <h3 className='text-base font-bold mb-2'>
                            About Us
                        </h3>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi enim,
                            cupiditate autem ducimus quidem quis quo et sequi debitis suscipit aliquid!
                            Nobis vero at nisi nulla dolor quasi unde cupiditate!
                        </p>
                        <p>&copy; { new Date().getFullYear() } E-commerce All rights reserved</p>
                    </div>
                    <div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6 flex flex-col gap-2'>
                        <h3 className='text-base font-bold mb-2'>
                            Follow Us
                        </h3>
                        <div className='flex gap-2'>
                            <a href="#">
                                <MdFacebook size={ 24 } />
                            </a>
                            <a href="#">
                                <AiFillInstagram size={ 24 } />
                            </a>
                            <a href="#">
                                <AiFillTwitterCircle size={ 24 } />
                            </a>
                            <a href="#">
                                <AiFillYoutube size={ 24 } />
                            </a>
                        </div>
                    </div>
                </div>
            </Container>

        </footer>
    )
}

export default Footer
