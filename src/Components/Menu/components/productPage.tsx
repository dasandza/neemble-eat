import {MenuItemJson} from "../../../schema.ts";
import {CartIcon} from "../../../assets/icons";
import CartPopUp from "../../CartPopUp.tsx";
import React, {useEffect, useState} from "react";
import {CartItem} from "../../../interfaces.tsx";
import {
    getCartFromLocalStorage,
    initializeCartInLocalStorage,
    saveCartToLocalStorage
} from "../../../utils/cartCRUD.ts";

interface props {
    item: MenuItemJson | null
    restaurantID: string
    menuID: string
    tableNumber: number
    disSelectItem: () => void
}


function ProductPage({item, restaurantID, menuID, tableNumber, disSelectItem}: props) {
    const [productAdded, setProductAdded] = useState<boolean>(false)

    const [numberOfItems, setNumberOfItems] = useState(0);
    const [cart, setCart] = useState<Array<CartItem>>(() => getCart())

    const [total, setTotal] = useState(0);
    const [isCartPopUpOpen, setIsCartPopUpOpen] = useState<boolean>(false)

    const togglePopup = () => {
        setIsCartPopUpOpen(!isCartPopUpOpen);
    };

    useEffect(() => {
        console.log("CART:", cart)
        saveCartToLocalStorage(cart)
    }, [cart]);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const note: string = formData.get("note") as string;
        let data: CartItem;
        if (item == null) {
            console.log("No item found");
            return;
        }
        console.log(numberOfItems)
        if (note == "") {
            data = {
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.imageURL,
                quantity: numberOfItems
            }
        } else {
            data = {
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.imageURL,
                quantity: numberOfItems,
                aditionalNote: note
            }
        }
        console.log(data)
        setNumberOfItems(0)
        addItemToCart(data)
        if (!isCartPopUpOpen) {
            setIsCartPopUpOpen(true);
        }

    };


    function closeTab() {
        togglePopup()
        setNumberOfItems(0)
    }


    function getCart() {
        const existingCart = getCartFromLocalStorage();
        if (existingCart) {
            return existingCart;
        } else {
            return initializeCartInLocalStorage();
        }
    }


    const addItemToCart = (item: CartItem) => {
        let newCart: Array<CartItem>;
        const prevCart: Array<CartItem> = getCartFromLocalStorage();
        const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex > -1) {
            const updatedCart = [...prevCart];
            updatedCart[existingItemIndex].quantity += item.quantity;
            newCart = updatedCart;
        } else {
            newCart = [...prevCart, item]
        }
        setCart(newCart)
        setNumberOfItems(0)
        setTotal(0)
        showMessage()
    };

    const showMessage = () => {
        setProductAdded(true);
        setTimeout(() => {
            setProductAdded(false);
        }, 3000);
    };

    const handleNumberOfItems = (operation: string) => {
        if (operation === '+') {
            setNumberOfItems(numberOfItems + 1)
        } else {
            setNumberOfItems(numberOfItems - 1)
        }
    }

    const handleTotal = (operation: string) => {
        if (item == null) {
            return
        }
        if (operation === '+') {
            setTotal(total + item.price)
        } else {
            setTotal(total - item.price)
        }
    }

    const handleButtons = (operation: string) => {
        if (operation === '+') {
            handleNumberOfItems(operation)
            handleTotal(operation)
        } else {
            if (total) {
                handleNumberOfItems(operation)
                handleTotal(operation)
            }
        }
    }


    return (
        <div className='font-poppins bg-white'>
            <div className='bg-gray-100 rounded-b-3xl flex flex-col justify-center pb-3.5'>
                <div className='flex relative justify-between items-center mx-6 mt-7 mb-5'>
                    <div className='absolute flex-none'>
                        <div className="text-left">
                            <p className='text-lg font-bold pr-3 cursor-pointer'
                               onClick={disSelectItem}>
                                {'<'}
                            </p>
                        </div>
                    </div>
                    <div className='flex-grow'></div>
                    <div className='flex-none text-center'>
                        {item?.name}
                    </div>
                    <div className='flex-grow'></div>
                    <div className='absolute right-0 flex-none'>
                        <button
                            className={``}
                            onClick={closeTab}>
                            <CartIcon className=''/>
                        </button>
                        {isCartPopUpOpen && (
                            <CartPopUp close={() => setIsCartPopUpOpen(false)}
                                       restaurantID={restaurantID}
                                       menuID={menuID}
                                       tableNumber={tableNumber}
                                       cart={cart}/>
                        )}
                    </div>
                </div>
                <div className='mx-auto rounded-md w-fit items-center overflow-hidden pb-4 px-5'>
                    <img src={item?.imageURL}
                         alt=""
                         className='rounded-md object-cover w-full max-h-52'/>
                </div>
                <div>
                    <h1 className='ml-5 font-semibold text-lg'>
                        {item?.name}
                    </h1>
                </div>
                <div>
                    <p className='rounded-lg text-sm ml-3.5 px-2 py-2 font-poppins-light'>
                        {item?.description}
                    </p>
                </div>
                <div className='ml-6 mt-2'>
                    <p className='w-fit italic font-semibold'>
                        {item?.price}.00 Kz
                    </p>
                </div>
            </div>
            <div className='mt-7'>
                <div className='mx-4'>
                    <div className='bg-gray-100 py-3 pl-5 rounded-xl'>
                        <h1 className='font-poppins-semibold'>
                            Informação Adicional
                        </h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit}
                      action=""
                      className='flex flex-col justify-center mt-5 mx-5'>
                    <textarea name="note" id="note" cols={30} rows={5}
                              placeholder='Adicione detalhes'
                              className="text-base rounded-md border border-gray-300 px-2 py-2 mb-5">

                    </textarea>
                    {
                        productAdded ?
                            <div className='flex text-green-500 justify-center mb-4 prevent-select'>
                                <p>
                                    Produto Adicionado
                                </p>
                            </div> :
                            <div className='flex text-white justify-center mb-4 prevent-select'>
                                <p>
                                    Produto Adicionado
                                </p>
                            </div>
                    }
                    <div className='flex justify-center '>
                        <div className='flex items-center'>
                            {
                                numberOfItems == 0 ?
                                    <button
                                        type="button"
                                        className="py-2 px-4 border border-gray-300 rounded-md p-2 hover:border-gray-400 hover:bg-gray-200 transition-colors duration-200 flex prevent-select cursor-not-allowed">
                                        -
                                    </button> :
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleButtons('-')
                                        }}
                                        className=" py-2 px-4 border border-gray-300 rounded-md p-2 hover:border-gray-400 hover:bg-gray-200 transition-colors duration-200 flex prevent-select">
                                        -
                                    </button>
                            }
                            <p className='prevent-select px-7 min-w-5 max-w-5 flex justify-center'>
                                {numberOfItems}
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    handleButtons('+')
                                }}
                                className="border prevent-select border-gray-300 rounded-md py-2 px-3.5 hover:border-gray-400 hover:bg-gray-200 transition-colors duration-200 flex">
                                +
                            </button>
                        </div>
                    </div>
                    {
                        total === 0 ?
                            <button
                                type="button"
                                className="self-center cursor-not-allowed bg-gray-500 prevent-select text-white px-16 py-2 rounded-md mt-6 mb-14">
                                Adicionar
                            </button> :
                            <button
                                type="submit"
                                className="self-center prevent-select hover:bg-gray-700 bg-black text-white px-16 py-2 rounded-md mt-6 mb-14">
                                Adicionar - {total}.00 Kz
                            </button>
                    }
                </form>

            </div>
        </div>
    );
}

export default ProductPage;
