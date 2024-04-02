import React, { useCallback, useState } from 'react'
import { products } from '../../../constants/data'
import Container from '../../../layout/Container'
import { Divider, List, Rating } from '@mui/material'
import SetQuantity from './SetQuantity'
import SetColor from './SetColor'
import AddToCartButton from '../../Buttons/AddToCartButton'
import ProductImage from './ProductImage'
import ListRating from './ListRating'

const ProductDetails = ( { } ) => {
    const product = products[ 2 ]
    console.log( product );
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

    const addToCart = () => {
        console.log( CartProduct )
    }

    return (
        <div className='p-8'>
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 '>
                    <div>
                        <ProductImage product={ product } cartProduct={ CartProduct } handleColorSelection={ handleColorSelection } />
                    </div>
                    <div className='flex flex-col gap-1 text-slate-500 text-sm'>
                        <h2 className='text-3xl font-medium text-slate-700'>
                            { product.name }
                        </h2>
                        <div className='flex items-center gap-2'>
                            <Rating value={ '2' } readOnly />
                            <div>
                                { product.reviews.length } reviews
                            </div>
                        </div>
                        <div className='text-justify'>
                            {
                                product.description
                            }
                        </div>
                        <Divider orientation="horizontal" className='py-2' />
                        <div>
                            <span className='font-semibold'>Category : </span>{ product.category }
                        </div>
                        <Divider orientation="horizontal" className='py-2' />
                        <div>
                            <SetColor cartProduct={ CartProduct } images={ product.images } handleColorSelection={ handleColorSelection } />
                        </div>
                        <Divider orientation="horizontal" className='py-2 pb-2' />
                        <div>
                            <SetQuantity cartProduct={ CartProduct } IncreaseQuantity={ IncreaseQuantity } DecreaseQuantity={ DecreaseQuantity } />
                        </div>
                        <Divider orientation="horizontal" className='py-2' />
                        <div>
                            { product.inStock ?
                                ( <span className='text-green-500 text-xl'> { product.inStock } availabe</span> )
                                :
                                ( <span className='text-red-500'>Out of Stock</span> ) }
                        </div>
                        <div className='max-w-[300px]'>
                            <AddToCartButton label={ "Add to Cart" } onClick={ () => addToCart() } />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mt-20 gap-4'>
                    <div className=''>Add Rating</div>
                    <ListRating product={ product } />
                </div>
            </Container>
        </div>
    )
}

export default ProductDetails
