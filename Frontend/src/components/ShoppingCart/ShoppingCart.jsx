import React, { useCallback, useEffect, useState } from 'react'
import Container from "../../layout/Container";
import { products } from '../../constants/data';
import SetQuantity from '../Product/ProductDetails/SetQuantity';
import SetColor from '../Product/ProductDetails/SetColor';
import { Divider } from '@mui/material';
import Button from '../Buttons/AddToCartButton'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/actions/cart';

const ShoppingCart = () => {

    const { cart } = useSelector( ( state ) => state.cart );
    const dispatch = useDispatch();
    const cartCounter = cart.length

    const product = products[ 2 ]
    const [ CartProduct, setCartProduct ] = useState( {
        id: product.id,
        name: product.name,
        price: product.price,
        SelectedImage: { ...product.images[ 0 ] },
        quantity: 1,
        category: product.category,
    } )

    const handleColorSelection = useCallback( ( i ) => {
        setCartProduct( ( prev ) => {
            return { ...prev, SelectedImage: i }
        } )
    } )

    const IncreaseQuantity = () => {
        setCartProduct( {
            ...CartProduct,
            quantity: CartProduct.quantity + 1,
        } )
    }

    const DecreaseQuantity = () => {
        if ( CartProduct.quantity > 1 )
        {
            setCartProduct( {
                ...CartProduct,
                quantity: CartProduct.quantity - 1,
            } )
        }

    }

    const handleCartQuantityProductIncrease = useCallback( ( product ) => {
        let updateCartProduct;
        if ( product.quantity === 99 )
        {
            return <Toast message='You can not add more than 99 products' />
        }
        if ( cart )
        {
            updateCartProduct = [ ...cart ]
            const existingIndex = cart.findIndex( ( p ) => p.id === product.id )

            if ( existingIndex > -1 )
            {
                updateCartProduct[ existingIndex ].quantity += 1;
            }

            setCartProduct( updateCartProduct )

        }

    }, [ cart ] )

    const removeProductFromCart = ( product ) => {
        dispatch( removeFromCart( product ) )
    }

    const [ amount, setAmount ] = useState( 0 )

    useEffect( () => {
        let totalPrice = 0;
        cart.map( ( product ) => {
            totalPrice += product.price
        } )
        setAmount( totalPrice )
    }, [ cart ] )

    return (
        <div>
            <Container>
                <div className=' flex gap-10 py-16 px-10 flex-col md:flex-row '>
                    <div className='w-full md:w-2/3'>
                        <p className='font-bold text-2xl'>Shopping Cart ( { cartCounter } items)</p>
                        <hr className='my-6' />
                        {
                            cart.length === 0 ? <p className='text-heading4'>Your cart is empty</p>
                                :
                                <div>
                                    { cart.map( ( product ) => (
                                        <div key={ product.id } className='w-full flex hover:bg-grey-1 px06 py-5 items-center justify-between'>
                                            <div className='flex items-center'>
                                                <img src={ product.image_Url[ 0 ].url } alt={ product.name } width={ 100 } height={ 100 } className='rounded-lg w-32 h-32 object-contain' />
                                                <div className='flex flex-col gap-3 ml-4'>
                                                    <p className='text-body-bold'>{ product.name }</p>
                                                    <div className='flex flex-col justify-center gap-2'>
                                                        <div>
                                                            <SetQuantity cartProduct={ CartProduct } cartCounter={ false } IncreaseQuantity={ IncreaseQuantity } DecreaseQuantity={ DecreaseQuantity } />
                                                        </div>
                                                        <div>
                                                            <SetColor cartProduct={ CartProduct } images={ product.image_Url } handleColorSelection={ handleColorSelection } />
                                                        </div>
                                                        <div className='w-[70px]'>
                                                            <button className='text-slate-500 underline' onClick={ () => removeProductFromCart( product ) }>Remove</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    ) ) }
                                </div>
                        }
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div className='w-full md:w-1/3'>
                        <div>
                            <p className='font-bold text-2xl'>Order Summary</p>
                            <hr className='my-6' />
                            { cart.map( ( product ) => (
                                <div key={ product.id } onChange={ ( product ) => setAmount( amount + product.price ) }>
                                    <div className='flex justify-between'>
                                        <p className='text-body'>* { product.name }</p>
                                        <p className='text-body'>${ product.price }</p>
                                    </div>
                                </div>
                            ) ) }
                            <hr className='my-6' />
                            <div className='flex justify-between mb-4'>
                                <p className='font-bold'>Total</p>
                                <p className='font-bold'>${ amount }</p>
                            </div>
                            <Button label={ "Proccde to checkout" } />
                        </div>
                    </div>
                </div>
            </Container >
        </div >
    )
}

export default ShoppingCart
