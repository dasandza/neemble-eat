import {useCartContext} from "../../../context/cartContext.ts";

interface props {
    handleSubmit: () => void,
}

function CheckOut({handleSubmit}: props) {

    const {customerName, setCustomerName, cart} = useCartContext()

    const handleCustomerName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCustomerName(event.target.value);
        sessionStorage.setItem('CustomerName', event.target.value);
    };

    if (cart.totalValue <= 0)
        return <div></div>

    return (
        <div className={`fixed bottom-4 left-0 w-full`}>
            <div className='py-5 bg-white rounded-2xl px-5 mx-4 border border-gray-200 shadow-md'>
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='italic text-sm text-zinc-700'>
                                Total:
                            </p>
                        </div>
                        <div>
                            <h2 className=' font-semibold text-lg'>
                                {cart.totalValue} Kz
                            </h2>
                        </div>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <form className='w-full' action="">
                                <textarea name="name" id="name" cols={30} rows={1}
                                          placeholder='Nome (opcional)'
                                          onChange={handleCustomerName}
                                          value={customerName}
                                          className="peer w-full text-base resize-none rounded-b-none border-b border-gray-600 bg-transparent pb-1.5 text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50">

                                </textarea>
                            <button
                                type='button'
                                className='font-poppins-semibold mt-2 flex bg-black text-white rounded-3xl w-full py-4 text-sm justify-center'
                                onClick={handleSubmit}>
                                Confirmar Pedido
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;