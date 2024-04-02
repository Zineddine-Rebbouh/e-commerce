import { Avatar, Rating } from '@mui/material'
import React from 'react'
import moment from "moment"


const ListRating = ( { product } ) => {
    return (
        <div>
            <div className=''>
                <h1 className='font-bold text-2xl '>Product Review</h1>
            </div>
            <div className='text-sm mt-4'>
                {
                    product.reviews && product.reviews.map( ( review, index ) => (
                        <div key={ index } className='max-w-300px'>
                            <div className='flex items-center gap-2'>
                                <Avatar src={ review.user.image } />
                                <h1 className='flex font-semibold'>{ review?.user.name }</h1>
                                <div className='font-light ml-2'>{ moment( review?.createDate ).fromNow() }</div>
                            </div>
                            <div className='mt-2'>
                                <Rating value={ review?.rating } readOnly />
                                <div className='ml-2'>
                                    { review?.comment }
                                </div>
                                <hr className='my-4' />
                            </div>
                        </div>
                    ) )
                }
            </div>
        </div>
    )
}

export default ListRating
