import {PriceTag, QrCode} from "../assets/icons";
import {OrderJson} from "../schema.ts";

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
                        &nbsp;{order.quantity}
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
                    <div className='flex space-x-1.5 items-center rounded-full px-2.5 py-0.5 bg-green-200'>
                        <div className={`h-1 w-1 bg-green-400 rounded-full`}></div>
                        <p className='font-poppins-medium text-xs'>
                            Pronto
                        </p>
                    </div>

                }
                {
                    order.prepStatus == "In Progress" &&
                    <div className='flex space-x-1.5 items-center px-2.5 py-0.5 bg-yellow-300 rounded-full'>
                        <div className={`h-1 w-1 bg-yellow-500 rounded-full`}></div>
                        <p className='font-poppins-medium text-xs'>
                            Em Preparo
                        </p>
                    </div>
                }
                {
                    order.prepStatus == "New" &&
                    <div className='flex space-x-1.5 items-center px-2.5 py-0.5 bg-blue-200 rounded-full'>
                        <div className={`h-1 w-1 bg-blue-400 rounded-full`}></div>
                        <p className='font-poppins-medium text-xs'>
                            Novo
                        </p>
                    </div>
                }
                {
                    order.prepStatus == "Cancelled" &&
                    <div className='flex space-x-1.5 items-center px-2.5 py-0.5 bg-red-200 rounded-full'>
                        <div className={`h-1 w-1 bg-red-400 rounded-full`}></div>
                        <p className='font-poppins-medium text-xs'>
                            Cancelado
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}

export default OrderListingItem;