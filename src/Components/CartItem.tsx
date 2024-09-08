import {CartItem} from "../interfaces.tsx";
import {useState} from "react";
import {BinIcon} from "../assets/icons";

interface CartItemProps {
    cartProduct: CartItem,
    tableNumber: number,
    restaurantID: string,
    menuID: string,
    increment: (id: string) => CartItem | undefined,
    decrement: (id: string) => CartItem | undefined,
    deleteItem: (id: string) => void,
}

function CartSingleItem({
                            cartProduct,
                            decrement,
                            increment,
                            deleteItem
                        }: CartItemProps) {
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

    function deleteProduct(id: string) {
        deleteItem(id)
    }


    if (localItem == undefined) {
        return <div></div>
    }

    return (
        <div className=''>
            <div className="">
                <div className='flex justify-between pt-3 pb-1 px-3'>
                    <div className='flex w-full'>
                        <div
                            className='flex items-center shadow-sm justify-center overflow-hidden rounded-xl mr-4 w-28 h-28 min-w-28 min-h-28'>
                            <img src={localItem.image}
                                 alt=""
                                 className='rounded-md object-cover w-full h-full'/>
                        </div>
                        <div className='w-full'>
                            <h1 className='font-semibold text-zinc-800'>
                                {localItem.name}
                            </h1>
                            <div className='text-sm text-zinc-600 flex'>
                                <p>{localItem.price} Kz </p>
                                <p className='mx-1'>x</p>
                                <p className='font-bold'>{localItem.quantity}</p>
                            </div>
                            <div className='flex justify-between items-center max-w-28 mt-3.5'>
                                <div className='flex space-x-3'>
                                    <div
                                        className='flex hover:bg-gray-400 transition-colors duration-300 items-center justify-center bg-gray-300 rounded-full px-2 cursor-pointer'>
                                        <p className='flex items-center justify-center text-black prevent-select'
                                           onClick={() => decrementProduct(localItem.id)}>
                                            -
                                        </p>
                                    </div>
                                    <div
                                        className='flex hover:bg-gray-400 transition-colors duration-300 items-center justify-center bg-gray-300 rounded-full px-2 cursor-pointer'>
                                        <p className='flex items-center justify-center text-black prevent-select'
                                           onClick={() => incrementProduct(localItem.id)}>
                                            +
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className='flex hover:bg-red-500 transition-colors duration-200 items-center justify-center bg-gray-300 rounded-full px-1 py-1 cursor-pointer'>
                                        <BinIcon
                                            onClick={() => {
                                                deleteProduct(localItem.id)
                                            }}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div
                        className=' ml-1.5 flex items-center'>
                        <div className='flex items-center prevent-select'>
                            <p className='text-zinc-400'>{'>'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartSingleItem;