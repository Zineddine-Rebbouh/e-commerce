import React, { useCallback, useEffect, useState } from 'react'
import { products } from '../../../constants/data'
import Container from '../../../layout/Container'
import { Divider, List, Rating } from '@mui/material'
import SetQuantity from './SetQuantity'
import SetColor from './SetColor'
import AddToCartButton from '../../Buttons/AddToCartButton'
import ProductImage from './ProductImage'
import ListRating from './ListRating'
import AddRating from '../../Rating/AddRating'
import RelatedProduct from './RelatedProduct'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import * as apiClient from "../../../api/api-Client"
import { useDispatch } from 'react-redux'
import { addTocart } from '../../../redux/actions/cart'

const ProductDetails = () => {
    // const product = products[ 2 ]

    const { id } = useParams();

    const dispatch = useDispatch()
    const [ productDetails, setProductDetails ] = useState( {} )
    // fetch the product using the id 




    const { data: product, isLoading, isError, error } = useQuery(
        [ "product", id ],
        () => apiClient.getProduct( id ),
        {
            onSuccess: ( data ) => {
                console.log( "Product data:", data )
                data.product.Reviews = data.Reviews
                setProductDetails( data.product )
            },
            onError: ( error ) => console.error( "Error fetching product:", error ),
        }
    );


    // productDetails?.Reviews.sort( ( a, b ) => {
    //     return new Date( b.createdAt ) - new Date( a.createdAt )
    // } )


    const [ cartProduct, setCartProduct ] = useState( {
        quantity: 1,
    } );

    useEffect( () => {
        if ( productDetails )
        {
            // Update cartProduct once product data is available
            setCartProduct( {
                ...productDetails,
                quantity: 1,
            } );
        }
    }, [ productDetails ] );


    const handleColorSelection = useCallback( ( i ) => {
        setCartProduct( ( prev ) => {
            return { ...prev, SelectedImage: i }
        } )
    } )

    const IncreaseQuantity = () => {
        setCartProduct( {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
        } )
    }

    const DecreaseQuantity = () => {
        if ( cartProduct.quantity > 1 )
        {
            setCartProduct( {
                ...cartProduct,
                quantity: cartProduct.quantity - 1,
            } )
        }
    }



    const addToCartHandler = ( data ) => {
        console.log( data );
        // setCartProduct( { ...data, productDetails } )
        dispatch( addTocart( data ) )
    };

    console.log( productDetails );
    if ( isLoading )
    {
        return <div>Loading...</div>;
    }


    return (
        <div className='p-8'>
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 '>
                    <div>
                        <ProductImage product={ productDetails } cartProduct={ cartProduct } handleColorSelection={ handleColorSelection } />
                    </div>
                    <div className='flex flex-col gap-1 text-slate-500 text-sm'>
                        <h2 className='text-3xl font-medium text-slate-700'>
                            { productDetails?.name }
                        </h2>
                        <div className='flex items-center gap-2'>
                            <Rating value={ productDetails?.rating } readOnly />
                            <div>
                                {/* { productDetails?.Reviews.length } reviews */ }
                            </div>
                        </div>
                        <div className='text-justify'>
                            {
                                productDetails?.description
                            }
                        </div>
                        <Divider orientation="horizontal" className='py-4 pb-4' />
                        <div>
                            <span className='font-semibold'>Category : </span>{ productDetails?.categoryId?.name }
                        </div>
                        {/* <Divider orientation="horizontal" className='py-2' /> */ }
                        {/* <div>
                            <SetColor cartProduct={ CartProduct } images={ product?.image } handleColorSelection={ handleColorSelection } />
                        </div> */}
                        <Divider orientation="horizontal" className='py-4' />
                        <div>
                            <SetQuantity cartProduct={ cartProduct } IncreaseQuantity={ IncreaseQuantity } DecreaseQuantity={ DecreaseQuantity } />
                        </div>
                        <Divider orientation="horizontal" className='py-4 pb-4' />
                        <div>
                            { productDetails?.available_quantity ?
                                ( <span className='text-green-500 text-xl'> { productDetails?.available_quantity } availabe</span> )
                                :
                                ( <span className='text-red-500'>Out of Stock</span> ) }
                        </div>
                        <div className='max-w-[300px]'>
                            <AddToCartButton label={ "Add to Cart" } onClick={ () => addToCartHandler( cartProduct ) } />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mt-20 gap-4'>
                    <AddRating />
                    <ListRating product={ productDetails } />
                </div>
                <div>
                    <RelatedProduct categoryId={ productDetails?.categoryId?._id } />
                </div>
            </Container>
        </div>
    )
}

export default ProductDetails
