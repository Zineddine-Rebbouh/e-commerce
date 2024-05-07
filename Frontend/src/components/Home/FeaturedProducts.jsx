import React from "react";
// import { useSelector } from "react-redux";
import styles from "../../utils/styles";
import ProductCard from "../Product/ProductCard";
import * as apiClient from "../../api/api-Client";
import { useQuery } from "react-query";


const FeaturedProducts = () => {
    const { data: productData } = useQuery( "products", apiClient.getProducts );

    const products = productData?.sort( ( a, b ) => b.total_sell - a.total_sell );

    return (
        <div>
            <div>
                <div className={ `${ styles.heading }` }>
                    < h1 className="text-3xl font-bold text-gray-900 mb-8" >Featured Products</h1>
                </div>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                    {
                        <>
                            { productData && productData.map( ( i, index ) => <ProductCard data={ i } key={ index } /> ) }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default FeaturedProducts
