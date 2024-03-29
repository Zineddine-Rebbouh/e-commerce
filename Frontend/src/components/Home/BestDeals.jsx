import React, { useEffect, useState } from "react";
import styles from "../../utils/styles";
import ProductCard from "../Product/ProductCard";
import { productData } from "../../constants/data"
import Container from "../../layout/Container";

const BestDeals = () => {
    const [ data, setData ] = useState( null ); // Remove the empty array initialization

    console.log( productData );
    useEffect( () => {
        const sortedData = productData?.sort( ( a, b ) => b.total_sell - a.total_sell ); // Correct the sorting logic based on total_sell
        const firstFive = sortedData && sortedData.slice( 0, 5 );
        setData( firstFive );
    }, [] );


    return (
        <div>
            <div className={ `${ styles.heading }` }>
                <h1>Best Deals</h1>
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                {
                    data && data.map( ( item, index ) => <ProductCard data={ item } key={ index } /> )
                }
            </div>
        </div>
    );
};

export default BestDeals;
