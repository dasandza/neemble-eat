import {PriceTag} from "../assets/icons";
import {SessionStatus, TableSessionJson} from "../schema.ts";

interface props {
    session: TableSessionJson,
    onClick: () => void
}

function SessionListingItem({session, onClick}: props) {
    return (
        <div
            onClick={onClick}
            className='flex justify-between items-center hover:bg-gray-100 transition-colors duration-300 rounded-lg px-5 py-1 mx-2 cursor-pointer'>
            <div className=''>
                <div className='flex mb-2'>
                    <h1 className='truncate max-w-36 hover:overflow-clip laptop:hover:max-w-fit font-poppins-semibold '>
                        Mesa {session.tableNumber}
                    </h1>
                </div>
                <div className='flex items-center prevent-select'>
                    <h2 className='flex items-center rounded-md border border-gray-200 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold mr-2'>
                        <PriceTag className='mr-1'/>
                        {session.total}&nbsp;Kz
                    </h2>
                </div>

            </div>
            <div className='prevent-select'>
                {
                    session.status == "Billed" &&
                    <div className=''>
                        <p className='bg-green-200 rounded-full text-xs px-2.5 py-0.5'>
                            Fatura
                        </p>
                    </div>

                }
                {
                    session.status == "Open" &&
                    <div className=''>
                        <p className='bg-yellow-300 rounded-full text-xs px-2.5 py-0.5'>
                            Em Consumo
                        </p>
                    </div>
                }
                {
                    session.status == "Cancelled" as SessionStatus &&
                    <div className=''>
                        <p className='bg-red-300 rounded-full text-xs px-2.5 py-0.5'>
                            Cancelado
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}

export default SessionListingItem;