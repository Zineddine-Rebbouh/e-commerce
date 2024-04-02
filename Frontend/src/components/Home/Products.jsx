import React, { useState } from 'react'
import Container from '../../layout/Container'
import { productData } from '../../constants/data';
import ProductCard from "../Product/ProductCard"
import PriceFilter from '../Filter/PriceFilter';
import CategoriesFilter from '../Filter/CategoriesFilter';
import FilterSection from '../Filter/FilterSection';

const Products = () => {

    const [ sortOption, setSortOption ] = useState()

    return (
        <div className='p-8'>
            <Container>
                <div className='grid grid-cols-8 gap-10'>
                    <div className='col-span-2'>
                        <FilterSection />
                    </div>
                    <div className='col-span-6'>
                        <div className='flex items-center justify-end mb-10 '>
                            <select
                                value={ sortOption }
                                onChange={ ( event ) => setSortOption( event.target.value ) }
                                className="p-2 border rounded-md bg-white"
                            >
                                <option value="" className='bg-white'>Sort By</option>
                                <option value="starRating">Star Rating</option>
                                <option value="pricePerNightAsc">
                                    Price Per Night (low to high)
                                </option>
                                <option value="pricePerNightDesc">
                                    Price Per Night (high to low)
                                </option>
                            </select>
                        </div>
                        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12">
                            { productData && productData.map( ( i, index ) => <ProductCard data={ i } key={ index } /> ) }
                        </div>
                        { productData && productData.length === 0 ? (
                            <h1 className="text-center w-full pb-[100px] text-[20px]">
                                No products Found!
                            </h1>
                        ) : null }
                    </div>
                </div>
            </Container >
        </div>
    );
};

export default Products
