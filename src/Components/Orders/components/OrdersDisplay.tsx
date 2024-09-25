import {useOrdersContext} from "../../../context/ordersContext.ts";
import {OrderSingleItem, Ready, InProgress, Cancelled} from "../index.ts";


function OrdersDisplay() {

    const {orders} = useOrdersContext()

    return (
        <div className='bg-white shadow-sm p-3 rounded-3xl mt-3 border border-gray-200'>
            {
                orders &&
                orders.map((order, index) => (
                    <div key={index}
                         className='item m-2'>
                        <OrderSingleItem order={order}/>
                        <div className='my-2'>
                            {
                                order.prepStatus == "Done" ?
                                    <Ready/> :
                                    order.prepStatus == "Cancelled" ?
                                        <Cancelled/> :
                                        <InProgress/>
                            }
                        </div>
                    </div>
                ))
            }
        </div>

    );
}

export default OrdersDisplay;