import {useEffect, useState} from "react";
import {OrderJson} from "../../../schema.ts";
import {fetchAllRestaurantOrders} from "../../../api";

interface props {
    restaurantID: string
}


function Orders({restaurantID}: props) {

    const [orders, setOrders] = useState<OrderJson[]>([])


    useEffect(() => {

        async function fetch() {

            const ordersJson = await fetchAllRestaurantOrders({restaurantID: restaurantID})
            setOrders(ordersJson)
        }

        fetch().then()

    }, []);

    if (!orders) {
        return <div>Loading</div>
    }

    return (
        <div className=''>


        </div>
    );
}

export default Orders;