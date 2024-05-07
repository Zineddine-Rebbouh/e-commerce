import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Loader } from "../../Loader/Loader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom'

const Orders = () => {

  const [ ordersList, setOrdersList ] = useState( [] );
  const { orders } = useSelector( ( state ) => state.order );
  const navigate = useNavigate()

  useEffect( () => {
    console.log( orders );
    if ( orders )
    {
      const formattedOrders = orders.map( ( o ) => ( {
        id: o._id,
        name: o.userId.name,
        status: o.status,
        createdAt: format( new Date( o.createdAt ), "yyyy-MM-dd" ),
      } ) );
      setOrdersList( formattedOrders );
    }
  }, [ orders ] );

  const columns = [
    { field: "id", headerName: "ID", width: 620 },
    { field: "name", headerName: "Name", width: 300 },
    // { field: "email", headerName: "Email", width: 150 },
    { field: "status", headerName: "Status", width: 250 },
    { field: "createdAt", headerName: "Created Date", width: 250 },

    // { field: "status", headerName: "Status", width: 150 },
  ];

  console.log( orders );

  const rows = ordersList?.map( ( order ) => {
    return {
      id: order.id,
      name: order.name,
      //   email: order.user.email,
      //   phone: order.user.phone,
      status: order.status,
      createdAt: order.createdAt,
      //   status: order.status,
    };
  } );

  return (
    <div style={ { height: "100%", width: "100%" } }>
      <DataGrid
        rows={ rows }
        columns={ columns }
        getRowSpacing={ ( row ) => 10 }
        initialState={ {
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        } }
        pageSizeOptions={ [ 5, 10 ] }
        onRowClick={ ( row ) => navigate( '/profile/order/' + row.id ) } // Pass the id of the clicked row
      />
    </div>
  );
};

export default Orders;
