import {CharmCross} from "../assets/icons";
import {CartItem} from "../interfaces.tsx";
import {Link} from "react-router-dom";

interface PopUpButtonParams {
    close: () => void
    restaurantID: string
    menuID: string
    tableNumber: number,
    cart: CartItem[]
}

const PopUpButton = ({close, restaurantID, menuID, tableNumber, cart}: PopUpButtonParams) => {


    return (
        <div
            className="absolute top-full mt-0 right-0 w-48 p-4 bg-white border rounded shadow-lg z-10">
            <div className='flex justify-end '>
                <button type='button'
                        onClick={close}>
                    <CharmCross/>
                </button>

            </div>
            {
                cart.length > 0 ?
                    <div className=''>
                        <div className='divide-y-[0.2px] divide-gray-300 space-y-2'>
                            {cart.reverse().map((item, index) => (
                                <div key={index} className='pt-2'>
                                    <h1 className='truncate text-base'>
                                        {item.name}
                                    </h1>
                                    <div className='text-sm flex text-gray-700 space-x-1'>
                                        <p>
                                            {item.price} Kz
                                        </p>
                                        <p className='font-poppins-semibold'>
                                            x{item.quantity}
                                        </p>

                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='mt-2'>
                            <Link to={`/neemble-eat/c/${restaurantID}/${menuID}/${tableNumber}`}
                                  className='flex justify-center w-full bg-black rounded-full text-sm py-1 text-white'>
                                Ver carrinho
                            </Link>
                        </div>
                    </div> :
                    <div className='flex justify-center items-center'>
                        <p className='text-gray-600 italic text-sm py-5'>
                            Carrinho Vazio
                        </p>
                    </div>
            }


        </div>
    );
};

export default PopUpButton;
