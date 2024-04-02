import React from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from 'react-redux';

const CartCount = () => {
    const { cart } = useSelector( ( state ) => state.cart )
    const CartCounter = cart.length
    return (
        <div
            className='relative cursor-pointer'
            onClick={ () => {

            } }
        >
            <div className='text-3xl'>
                <CiShoppingCart size={ 32 } />
            </div>
            <span className={ `${ CartCounter === 0 ? "" : "bg-[#222]" }  absolute
                top-[-10px] right-[-10px] text-white h-6 w-6 rounded-full flex items-center justify-center text-sm ` }>
                { CartCounter === 0 ? '' : CartCounter }
            </span>

        </div >
    )
}

export default CartCount
