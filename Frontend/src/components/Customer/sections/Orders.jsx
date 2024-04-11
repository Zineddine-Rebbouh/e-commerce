import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Loader } from "../../Loader/Loader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const Orders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    console.log(orders);
    if (orders) {
      const formattedOrders = orders.map((o) => ({
        id: o._id,
        name: o.userId.name,
        total: o.totalPrice,
        startDate: format(new Date(o.createdAt), "yyyy-MM-dd"),
        isDelivered: o.isDelivered ? "Yes" : "No", // Assuming `isDelivered` is a boolean
      }));
      setOrdersList(formattedOrders);
    }
  }, [orders]);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 300 },
    // { field: "email", headerName: "Email", width: 150 },
    { field: "total", headerName: "Total", width: 250 },
    { field: "isDelivered", headerName: "IsDelivered", width: 250 },
    { field: "startDate", headerName: "StartDate", width: 250 },

    // { field: "status", headerName: "Status", width: 150 },
  ];

  console.log(orders);

  const rows = ordersList?.map((order) => {
    return {
      id: order.id,
      name: order.name,
      //   email: order.user.email,
      //   phone: order.user.phone,
      total: order.total,
      startDate: order.startDate,
      isDelivered: order.isDelivered,
      //   status: order.status,
    };
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowSpacing={(row) => 10}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Orders;
