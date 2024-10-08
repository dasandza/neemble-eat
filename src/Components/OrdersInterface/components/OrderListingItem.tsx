import {PriceTag, QrCode} from "../../../assets/icons";
import {OrderJson} from "../../../schema.ts";
import {InProgress, New, Done, Cancelled} from "./tags.tsx"


interface props {
    order: OrderJson,
    onClick: () => void
}


function OrderListingItem({order, onClick}: props) {
    return (

        <div
            onClick={onClick}
            className='flex justify-between items-center hover:bg-gray-100 transition-colors duration-300 rounded-lg px-5 py-1 mx-2 cursor-pointer'>
            <div className=''>
                <div className='flex mb-2'>
                    <h1 className='truncate max-w-36 hover:overflow-clip laptop:hover:max-w-fit font-poppins-semibold '>
                        {order.orderedItemName}
                    </h1>
                    <p className='text-gray-400 font-poppins-semibold'>
                        &nbsp;&nbsp; {order.quantity}
                    </p>
                </div>
                <div className='flex items-center prevent-select'>
                    <h2 className='flex items-center rounded-md border border-gray-200 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold mr-2'>
                        <PriceTag className='mr-1'/>
                        {order.total}&nbsp;Kz
                    </h2>
                    <h2 className='flex items-center rounded-md border border-gray-200 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold'>
                        <QrCode className='mr-1'/>
                        Mesa {order.tableNumber}
                    </h2>
                </div>

            </div>
            <div className='prevent-select'>
                {
                    order.prepStatus == "Done" &&
                    <Done/>

                }
                {
                    order.prepStatus == "In Progress" &&
                    <InProgress/>
                }
                {
                    order.prepStatus == "New" &&
                    <New/>
                }
                {
                    order.prepStatus == "Cancelled" &&
                    <Cancelled/>
                }
            </div>
        </div>
    );
}

export default OrderListingItem;