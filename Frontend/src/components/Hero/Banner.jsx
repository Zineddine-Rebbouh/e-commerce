import React from 'react'
import BannerImage from '../../assets/banner-image.png'
const Banner = () => {
    return (
        <div className='relative bg-gradient-to-r from-orange-500 to-yellow-500 mb-8'>
            <div className='mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly'>
                <div className='mb-8 md:mb-0 text-center'>
                    <h1 className='text-4xl md:text-6xl font-bold text-white mb-4'>Summer sales</h1>
                    <p className='text-lg md:text-xl text-white mb-2'>
                        Enjoy discounts on selected items
                    </p>
                    <p className='text-2xl md:text-5xl text-yellow-400 font-bold uppercase'>
                        get 50% off
                    </p>
                </div>
                <div className='w-1/3 relative aspect-video'>
                    <img src={ BannerImage } alt="Banner Image" className='w-full h-full object-contain' />
                </div>
            </div>
        </div >
    )
}

export default Banner
