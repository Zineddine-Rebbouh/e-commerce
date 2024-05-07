import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddProduct from '../../Forms/AddProduct';
import * as apiClient from '../../../api/api-Client'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';


const Products = () => {
    const [ showAddForm, setShowAddForm ] = useState( false ); // State variable to control the visibility of the add form
    const { shop, isLoading } = useSelector( ( state ) => state.shop );



    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        {
            field: "image",
            headerName: "Image",
            width: 100,
            renderCell: ( params ) => {
                console.log( params ); // Log the params object
                return (
                    <img src={ params.row.image.props.src } alt={ params.row.name } className='w-14 h-14 object-contain' />
                );
            }
        },
        { field: "name", headerName: "Name", width: 250 },
        { field: "description", headerName: "Description", width: 450 },
        { field: "price", headerName: "Price", width: 120 },
        { field: "category", headerName: "Category", width: 150 },
        { field: "stock", headerName: "Stock", width: 100 },
        { field: "discount", headerName: "Discount", width: 100 },
        {
            field: "actions",
            headerName: "Actions",
            width: 250,
            renderCell: ( params ) => (
                <div className='flex items-center gap-2 h-full'>
                    <FaEdit
                        size={ 20 }
                        className="text-blue-500 cursor-pointer mr-2"
                    />
                    <FaTrash
                        size={ 20 }
                        className="text-red-500 cursor-pointer"
                    />
                </div>
            ),
        },
    ];


    const handleHideForm = () => {
        setShowAddForm( false );
    };

    const handleAddProduct = () => {
        setShowAddForm( true );
    };

    const { data: products } = useQuery( 'products', apiClient.getProdutctsByShopId( shop._id ) )
    console.log( products );
    const rows = products?.map( ( product, index ) => ( {
        id: product._id,
        image: <img src={ product.image.url } alt={ product.name } className="w-10 h-10 object-cover rounded-full" />,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.categoryId.name,
        stock: product.available_quantity,
        discount: product.discount ? product.discount : 'N/A',
    } ) );

    return (
        <div style={ { height: 800, width: '100%', overflow: 'hidden' } } className="p-4">
            <div className='flex items-center justify-end py-5'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={ handleAddProduct }>Add Product</button>
            </div>
            { showAddForm && (
                <AddProduct onClose={ handleHideForm } />
            ) }

            <DataGrid
                rows={ rows }
                columns={ columns }
                getRowSpacing={ ( row ) => 10 }
                getRowHeight={ ( row ) => 70 }
                initialState={ {
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                } }
                pageSizeOptions={ [ 5, 10 ] }
                checkboxSelection
                disableSelectionOnClick
            />
        </div >
    )
}

export default Products
