import React, { useState } from "react";
import {
    AiFillHeart,
    AiOutlineEye,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    // AiOutlineStar,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../utils/styles";
import Rating from '@mui/material/Rating';
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";

// import { useDispatch, useSelector } from "react-redux";
// import {
//     addToWishlist,
//     removeFromWishlist,
// } from "../../../redux/actions/wishlist";
// import { useEffect } from "react";
// import { addTocart } from "../../../redux/actions/cart";
// import { toast } from "react-toastify";
// import Ratings from "../../Products/Ratings";

const ProductCard = ( { data, key } ) => {
    const { wishlist } = useSelector( ( state ) => state.wishlist );
    const { cart } = useSelector( ( state ) => state.cart );
    const [ click, setClick ] = useState( false );
    const [ open, setOpen ] = useState( false );
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const removeFromWishlistHandler = ( data ) => {
        dispatch( removeFromWishlist( data ) );
    };

    const addToWishlistHandler = ( data ) => {
        dispatch( addToWishlist( data ) )
    };

    const addToCartHandler = ( data ) => {
        dispatch( addTocart( data ) )
    };

    return (
        <>
            <div key={ key } className="w-full h-[380px] bg-white rounded-lg shadow-xl p-3 relative cursor-pointer">
                <div className="flex justify-end"></div>
                <Link to={ '/product-details/' + data.id }>
                    <img
                        src={ `${ data.image_Url && data.image_Url[ 0 ]?.url }` }
                        alt=""
                        className="w-full h-[170px] object-contain mb-2"
                    />
                </Link>
                <Link to={ '/product-details/' + data.id } className="flex items-center gap-2">
                    <Avatar widthImage={ 20 } heightImage={ 20 } src={ data.shop.shop_avatar.url } />
                    <h5 className={ `${ styles.shop_name }` }>{ data.shop.name }</h5>
                </Link>
                <Link to={ '/product-details/' + data.id }>
                    <h4 className="pb-3 font-[500]">
                        { data.name.length > 40 ? data.name.slice( 0, 40 ) + "..." : data.name }
                    </h4>

                    <div className="flex">
                        <Rating
                            value={ data.rating }
                        />
                    </div>

                    <div className="py-2 flex items-center justify-between">
                        <div className="flex">
                            <h5 className={ `${ styles.productDiscountPrice }` }>
                                { data.price === 0
                                    ? data.price
                                    : data.discount_price
                                }
                                $
                            </h5>
                            <h4 className={ `${ styles.price }` }>
                                { data.price ? data.price + " $" : null }
                            </h4>
                        </div>
                        <span className="font-[400] text-[17px] text-[#68d284]">
                            { data?.total_sell } sold
                        </span>
                    </div>
                </Link>

                {/* side options */ }
                <div>
                    { click ? (
                        <AiFillHeart
                            size={ 22 }
                            className="cursor-pointer absolute right-2 top-5"
                            onClick={ () => removeFromWishlistHandler( data ) }
                            color={ click ? "red" : "#333" }
                            title="Remove from wishlist"
                        />
                    ) : (
                        <AiOutlineHeart
                            size={ 22 }
                            className="cursor-pointer absolute right-2 top-5"
                            onClick={ () => addToWishlistHandler( data ) }
                            color={ click ? "red" : "#333" }
                            title="Add to wishlist"
                        />
                    ) }
                    <AiOutlineEye
                        size={ 22 }
                        className="cursor-pointer absolute right-2 top-14"
                        onClick={ () => navigate( '/product-details' ) }
                        color="#333"
                        title="Quick view"
                    />
                    <AiOutlineShoppingCart
                        size={ 25 }
                        className="cursor-pointer absolute right-2 top-24"
                        onClick={ () => addToCartHandler( data ) }
                        color="#444"
                        title="Add to cart"
                    />
                    {/* { open ? <ProductDetailsCard setOpen={ setOpen } data={ data } /> : null } */ }
                </div>
            </div >
        </>
    );
};

export default ProductCard;