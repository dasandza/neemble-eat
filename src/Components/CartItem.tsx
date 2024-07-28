import {CartItem} from "../interfaces.tsx";
import {Link} from "react-router-dom";
import {encodeString} from "../utils/urlhandler.ts";
import {useState} from "react";

interface CartItemProps {
    cartProduct: CartItem,
    tableNumber: string,
    placeName: string,
    increment: (id: string) => CartItem | undefined,
    decrement: (id: string) => CartItem | undefined,
}

function CartSingleItem({cartProduct, placeName, tableNumber, decrement, increment}: CartItemProps) {
    const [localItem, setLocalItem] = useState<CartItem>(cartProduct);


    function incrementProduct(id: string) {
        const item = increment(id)
        if (item != undefined) {
            setLocalItem(item)
        }
    }

    function decrementProduct(id: string) {
        const item = decrement(id)
        if (item != undefined) {
            setLocalItem(item)
        }
    }


    if (localItem == undefined) {
        return <div></div>
    }

    return (
        <div className=''>
            <div className="">
                <div className='flex justify-between pt-3 pb-1 px-3'>
                    <div className='flex justify-between'>
                        <div
                            className='flex items-center shadow-sm justify-center overflow-hidden rounded-xl mr-4 w-28 h-28 min-w-28 min-h-28'>
                            <img src={localItem.image}
                                 alt=""
                                 className='rounded-md object-cover w-full h-full'/>
                        </div>
                        <div>
                            <h1 className='font-semibold text-zinc-800'>
                                {localItem.name}
                            </h1>
                            <div className='text-sm text-zinc-600 flex'>
                                <p>{localItem.price}Kz </p>
                                <p className='mx-1'>x</p>
                                <p className='font-bold'>{localItem.quantity}</p>
                            </div>
                            <div className='flex justify-between max-w-20 min-w-20 mt-3.5'>
                                <div
                                    className='flex items-center justify-center bg-gray-300 rounded-full px-2 cursor-pointer'>
                                    <p className='flex items-center justify-center text-black prevent-select'
                                       onClick={() => decrementProduct(localItem.id)}>
                                        -
                                    </p>
                                </div>
                                <div
                                    className='flex items-center justify-center bg-gray-300 rounded-full px-2 cursor-pointer'>
                                    <p className='flex items-center justify-center text-black prevent-select'
                                       onClick={() => incrementProduct(localItem.id)}>
                                        +
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to={`/neemble-eat/p/${encodeString(placeName)}/${tableNumber}/${cartProduct.id}`}
                          className=' ml-1.5 flex items-center'>
                        <div className='flex items-center'>
                            <p className='text-zinc-400'>{'>'}</p>
                        </div>
                    </Link>

                </div>

            </div>


        </div>
    );
}

export default CartSingleItem;