import React, { useState } from 'react'
import CategoriesFilter from './CategoriesFilter';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';
import StarRatingFilter from './StarRatingFilter';

const FilterSection = () => {

    const [ selectedCategory, setSelectedCategory ] = useState();
    const [ selectedColor, setSelectedColor ] = useState( [] );
    const [ selectedStars, setSelectedStars ] = useState( [] );
    const [ selectedPrice, setSelectedPrice ] = useState();

    const handleStarsChange = ( event ) => {
        const starRating = event.target.value;

        setSelectedStars( ( prevStars ) =>
            event.target.checked
                ? [ ...prevStars, starRating ]
                : prevStars.filter( ( star ) => star !== starRating )
        );
    };

    const handleColorChange = ( event ) => {
        const color = event.target.value;

        selectedColor( ( prevStars ) =>
            event.target.checked
                ? [ ...prevStars, color ]
                : prevStars.filter( ( clr ) => clr !== color )
        );
    };

    return (
        <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10 bg-white shadow-lg">
            <div className="space-y-5">
                <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                    Filter by:
                </h3>
                <CategoriesFilter
                    selectedCategory={ selectedCategory }
                    onChange={ ( value ) => setSelectedCategory( value ) }
                />
                <ColorFilter
                    selectedCategory={ selectedColor }
                    onChange={ handleColorChange }
                />
                <StarRatingFilter
                    selectedStars={ selectedStars }
                    onChange={ handleStarsChange }
                />
                <PriceFilter
                    selectedPrice={ selectedPrice }
                    onChange={ ( value ) => setSelectedPrice( value ) }
                />
            </div>
        </div>
    )
}

export default FilterSection
