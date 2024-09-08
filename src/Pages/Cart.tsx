import CartSingleItem from "../Components/CartItem.tsx";
import {
    filterCart,
    getCartFromLocalStorage,
    getItemsInTheCartNumber,
    initializeCartInLocalStorage,
    saveCartToLocalStorage
} from "../utils/cartCRUD.ts";
import {Link, useParams} from "react-router-dom";
import {CartItem} from "../interfaces.tsx";
import {useEffect, useState} from "react";
import {TableSessionJson} from "../schema.ts";
import {addOrder, fetchRestaurantOpenTable} from "../api";


function Cart() {

    const [customerName, setCustomerName] = useState<string>('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [cart, setCart] = useState<Array<CartItem>>(() => getCart());
    const [numberOfItems, setNumberOfItems] = useState<number>(getItemsInTheCartNumber(cart))
    const {restaurantID, menuID, tableNumber} = useParams() as unknown as {
        restaurantID: string,
        menuID: string,
        tableNumber: number
    };


    const [totalValue, setTotalValue] = useState<number>(getTotalValue);
    const [session, setSession] = useState<TableSessionJson | null>(null)
    const [error, setError] = useState<string | null>(null);

    const filter_Cart = (cart: CartItem[]) => {
        return filterCart(cart)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const storedSession = sessionStorage.getItem("Session");
                let session: TableSessionJson | null = storedSession ? JSON.parse(storedSession) : null
                if (!session) {
                    session = await fetchRestaurantOpenTable({
                        tableNumber: tableNumber,
                        restaurantID: restaurantID
                    })
                    sessionStorage.setItem("Session", JSON.stringify(session))
                }

                setSession(session)

            } catch (err) {
                setError(null);
                setCart([])
                //window.location.reload();
                console.error("Error fetching data:", err);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        saveCartToLocalStorage(cart)
        setNumberOfItems(getItemsInTheCartNumber(cart))
        setTotalValue(getTotalValue)
    }, [cart]);

    function IncrementProduct(id: string) {
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            if (item.id == id) {
                cart[i].quantity++;
                setCart(filter_Cart(cart))
                //updateCart()
                return cart[i]
            }
        }
    }

    const handleCustomername = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCustomerName(event.target.value);
        sessionStorage.setItem('CustomerName', event.target.value);
    };

    function DecrementProduct(id: string) {
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            if (item.id == id) {
                if (cart[i].quantity == 1) {
                    setCart(filter_Cart(cart.filter((item) => item.id != id)))
                    return;
                } else {
                    item.quantity--
                    cart[i].quantity = item.quantity
                    setCart(filter_Cart(cart))
                    return cart[i]
                }
            }
        }
    }


    function DeleteProduct(id: string) {
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            if (item.id == id) {
                setCart(filter_Cart(cart.filter((item) => item.id != id)))
                return;
            }

        }

    }

    function getTotalValue() {
        let localTotal = 0
        if (cart.length == 0) {
            return 0;
        } else {
            for (let i = 0; i < cart.length; i++) {
                const item = cart[i]
                localTotal += (item.quantity * item.price);
            }
            return localTotal
        }
    }

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    function getCart() {
        const existingCart = getCartFromLocalStorage();
        if (existingCart) {
            return existingCart;
        } else {
            return initializeCartInLocalStorage();
        }
    }


    function handleSubmit() {
        const items = cart.map((item) => item)
        if (session != null) {
            for (const item of items) {
                addOrder({
                    sessionID: session.id,
                    itemID: item.id,
                    quantity: item.quantity,
                    additionalNote: item.aditionalNote
                }).catch((error) => console.error(error))
            }
            setCart([])
            togglePopup()
        }

    }

    if (error != null) return <div>{error}</div>


    return (
        <div className="w-full overflow-hidden prevent-select">
            <div className='font-poppins absolute min-w-full bg-gray-200 min-h-full pb-32'>
                <div className='flex relative justify-between items-center mx-6 mt-7'>
                    <Link to={`/neemble-eat/menu/${restaurantID}/${menuID}/${tableNumber}`}
                          className='absolute flex-none'>
                        <div className="text-left">
                            <p className='text-lg font-bold pr-3'>
                                {'<'}
                            </p>
                        </div>
                    </Link>
                    <div className='flex-grow'></div>
                    <div className='flex-none text-center '>
                        Carrinho
                    </div>
                    <div className='flex-grow'></div>
                </div>
                <div className='mt-5 mx-6'>
                    {numberOfItems == 1 ?
                        <p>
                            {numberOfItems} item
                        </p> :
                        <p>
                            {numberOfItems} itens
                        </p>
                    }
                </div>
                <div className='mx-0 mb-32 divide-y divide-gray-300'>
                    {
                        cart.map((item, index: number) =>
                                item != undefined && <div key={index} className='mt-3'>
                                    <CartSingleItem
                                        deleteItem={DeleteProduct}
                                        decrement={DecrementProduct}
                                        increment={IncrementProduct}
                                        cartProduct={item}
                                        menuID={menuID}
                                        restaurantID={restaurantID}
                                        tableNumber={tableNumber}/>
                                </div>
                        )
                    }
                </div>
                {
                    totalValue > 0 && <div className='fixed bottom-0 left-0 w-full py-5 bg-white rounded-t-2xl px-5'>
                        <div className='flex flex-col'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <p className='italic text-sm text-zinc-700'>
                                        Total:
                                    </p>
                                </div>
                                <div>
                                    <h2 className=' font-semibold text-lg'>
                                        {totalValue} Kz
                                    </h2>
                                </div>
                            </div>
                            <div className='flex justify-center mt-4'>
                                <form className='w-full' action="">
                                <textarea name="name" id="name" cols={30} rows={1}
                                          placeholder='Nome (opcional)'
                                          onChange={handleCustomername}
                                          value={customerName}
                                          className="peer w-full text-base resize-none rounded-b-none border-b border-gray-600 bg-transparent pb-1.5 text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50">

                                </textarea>
                                    <button
                                        type='button'
                                        className='mt-2 flex bg-black text-white rounded-3xl w-full py-4 text-sm justify-center'
                                        onClick={handleSubmit}>
                                        Confirmar Pedido
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                }
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-11/12 max-w-lg p-6 bg-white rounded shadow-lg">
                        <Link to={`/neemble-eat/o/${restaurantID}/${menuID}/${tableNumber}`}>
                            <button
                                onClick={togglePopup}
                                className="absolute top-0 right-0 mt-3 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                                &times;
                            </button>
                        </Link>
                        <h2 className="mb-4 text-xl font-bold">
                            Pedido confirmado{customerName == "" ? "!" : `, ${customerName}!`}
                        </h2>
                        <p className="mb-4">Aguarde que um garçon levará o seu pedido em breve.</p>
                        <Link to={`/neemble-eat/o/${restaurantID}/${menuID}/${tableNumber}`}>
                            <button
                                onClick={togglePopup}
                                className="px-7 py-1 text-white bg-black rounded-md focus:outline-none"
                            >
                                Fechar
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;