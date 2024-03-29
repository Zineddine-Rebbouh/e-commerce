import React from 'react'
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {

    return (
        <div
            className='relative cursor-pointer'
            onClick={ () => {

            } }
        >
            <div className='text-3xl'>
                <CiShoppingCart size={ 32 } />
            </div>
            <span className='absolute
            top-[-10px] right-[-10px] bg-[#222] text-white h-6 w-6 rounded-full flex items-center justify-center text-sm
            '>
                7
            </span>

        </div>
    )
}

export default CartCount
