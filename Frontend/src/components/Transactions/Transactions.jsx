import photoprofile from "../../assets/photoProfile.jpg";
import * as apiClient from '../../api/api-Client'
import { useEffect, useState } from "react";
import { Loader } from '../Loader/Loader'

const Transactions = () => {
    const [ transactions, setTransactions ] = useState( [] );

    // const { data: orders, isLoading, isError } = useQuery( "transactions", apiClient.getOrders,
    //     {
    //         onSuccess: () => {
    //             console.log( "Data fetched successfully" );
    //         },
    //         onError: () => {
    //             console.log( "Error fetching data" );
    //         }
    //     }
    // );

    useEffect( () => {
        const fetchTransactions = async () => {
            try
            {
                const response = await apiClient.getOrders();
                setTransactions( response.orders );
            } catch ( error )
            {
                console.error( error );
            }
        };
        fetchTransactions();
    }, [] );

    console.log( transactions );
    if ( !transactions ) return <Loader />

    return (
        <div className={ "bg-white p-5 rounded-lg" }>
            <h2 className={ "font-[200] mb-5 text-black" }> Latest Transactions</h2>
            <table className={ "w-full" }>
                <thead>
                    <tr>
                        <td className="font-semibold">ID</td>
                        <td className="font-semibold">Status</td>
                        <td className="font-semibold">Date</td>
                        <td className="font-semibold">Amount</td>
                    </tr>
                </thead>
                <tbody>
                    { transactions.map( ( order, index ) => (
                        <tr key={ index }>
                            <td className="p-4">
                                <div className={ "flex gap-2.5 items-center" }>
                                    { order._id }
                                </div>
                            </td>
                            <td className="p-2.5">
                                <span className={ "rounded-lg p-1 text-sm text-white bg-green-500" }>
                                    { order.isDelivered ? "Delivered" : "Pending" }
                                </span>
                            </td>
                            <td>{ order.createdAt }</td>
                            <td>{ order.totalPrice }.00 DZD</td>
                        </tr>
                    ) ) }
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;
