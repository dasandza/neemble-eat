import {AirtableOrders} from "../interfaces.tsx";
import {PriceTag, QrCode} from "../assets/icons";

interface props {
    order: AirtableOrders,
    onClick: () => void
}

function KitchenOrderListingItem({order, onClick}: props) {
    return (

        <div
            onClick={onClick}
            className='flex justify-between items-center hover:bg-gray-100 transition-colors duration-300 rounded-lg px-5 py-1 mx-2 cursor-pointer'>
            <div className=''>
                <div className='flex mb-2'>
                    <h1 className='truncate max-w-36 hover:overflow-clip laptop:hover:max-w-fit font-poppins-semibold '>
                        {order.fields["Name (from Item)"]}
                    </h1>
                    <p className='text-gray-400 font-poppins-semibold'>
                        &nbsp;{order.fields.Quantity}
                    </p>
                </div>
                <div className='flex items-center prevent-select'>
                    <h2 className='flex items-center rounded-md border border-gray-200 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold mr-2'>
                        <PriceTag className='mr-1'/>
                        {order.fields["Total"]}&nbsp;Kz
                    </h2>
                    <h2 className='flex items-center rounded-md border border-gray-200 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold'>
                        <QrCode className='mr-1'/>
                        Mesa {order.fields["Table Number"]}
                    </h2>
                </div>

            </div>
            <div className='prevent-select'>
                {
                    order.fields["Order Status"] == "Done" &&
                    <div className=''>
                        <p className='bg-green-200 rounded-full text-xs px-2.5 py-0.5'>
                            Pronto
                        </p>
                    </div>

                }
                {
                    order.fields["Order Status"] == "In progress" &&
                    <div className=''>
                        <p className='bg-yellow-300 rounded-full text-xs px-2.5 py-0.5'>
                            Em Preparo
                        </p>
                    </div>
                }
                {
                    order.fields["Order Status"] == "New" &&
                    <div className=''>
                        <p className='bg-blue-200 rounded-full text-xs px-2.5 py-0.5'>
                            Novo
                        </p>
                    </div>
                }
                {
                    order.fields["Order Status"] == "Cancelled" &&
                    <div className=''>
                        <p className='bg-red-200 rounded-full text-xs px-2.5 py-0.5'>
                            Cancelado
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}

export default KitchenOrderListingItem;