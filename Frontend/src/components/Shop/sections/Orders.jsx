import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import * as apiClient from '../../../api/api-Client';
import { Loader } from '../../Loader/Loader';
import { useQuery } from 'react-query';

const Orders = () => {
    const { shop, isLoading } = useSelector( ( state ) => state.shop );
    const columns = [
        { field: "id", headerName: "ID", width: 150 },
        { field: "name", headerName: "Name", width: 300 },
        { field: "isDelivered", headerName: "IsDelivered", width: 250 },
        { field: "startDate", headerName: "StartDate", width: 250 },
        { field: "adresse", headerName: "Adresse", width: 350 },
        { field: "total", headerName: "Total", width: 100 },
    ];

    const { data: orders, isLoading: isLoadingOrders } = useQuery( 'orders', apiClient.getShopOrdersByShopId( shop?._id ) );



    if ( !orders || orders.length === 0 )
    {
        return (
            <div style={ { height: "100%", width: "100%" } }>
                <p>No orders available</p>
            </div>
        );
    }

    return (
        <div style={ { height: "100%", width: "100%" } }>
            <DataGrid
                rows={ orders }
                columns={ columns }
                getRowSpacing={ ( row ) => 10 }
                initialState={ {
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                } }
                pageSizeOptions={ [ 5, 10 ] }
                checkboxSelection
            />
        </div>
    );
};

export default Orders;
