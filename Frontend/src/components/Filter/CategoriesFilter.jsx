import { categoriesData } from "../../constants/data";

const CategoriesFilter = ( { selectedCategory, onChange } ) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Category Type</h4>
            { categoriesData.map( ( category, index ) => (
                <label className="flex items-center space-x-2" key={ index }>
                    <input
                        type="radio"
                        className="rounded"
                        name="category"
                        value={ category.title }
                        checked={ selectedCategory === category.title }
                        onChange={ () => onChange( category.title ) }
                    />
                    <span>{ category.title }</span>
                </label>
            ) ) }
        </div>
    );
};

export default CategoriesFilter;
