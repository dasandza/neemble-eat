import CartSingleItem from "../Components/CartItem.tsx";
import {
    filterCart,
    getCartFromLocalStorage,
    getItemsInTheCartNumber,
    initializeCartInLocalStorage,
    saveCartToLocalStorage
} from "../utils/cartCRUD.ts";
import {Link, useParams} from "react-router-dom";
import {AirtableSession, CartItem, CartPageParams} from "../interfaces.tsx";
import {useEffect, useState} from "react";
import {decodeString} from "../utils/urlhandler.ts";
import fetchAirtableRecords from "../utils/fetcher.ts";
import addRecord from "../utils/writeAirtable.ts";


function Cart() {
    const [cart, setCart] = useState<Array<CartItem>>(() => {
        const existingCart = getCartFromLocalStorage();
        if (existingCart) {
            return existingCart;
        } else {
            return initializeCartInLocalStorage();
        }
    });
    const [numberOfItems, setNumberOfItems] = useState<number>(getItemsInTheCartNumber(cart))
    const {encodedBusinessName, tableNumber} = useParams() as unknown as CartPageParams;
    const businessName: string = decodeString(encodedBusinessName)
    const [totalValue, setTotalValue] = useState<number>(getTotalValue);
    const [session, setSession] = useState<AirtableSession | null>(null)
    const [error, setError] = useState<string | null>(null);
    //const [table, setTable] = useState<AirtableTable>()


    const filter_Cart = (cart: CartItem[]) => {
        return filterCart(cart)
    }


    useEffect(() => {
        async function fetchData() {
            try {
                //const tablesList: AirtableTable[] = await fetchAirtableRecords("Tables")
                //for (const table of tablesList) {
                //    if (table.fields["Name (from Restaurant)"][0].toLowerCase() == businessName.toLowerCase() &&
                //        table.fields.Number == tableNumber) {
                //        setTable(table)
                //        break
                //    }
                //}
                //setTable(filteredList[0].fields)
                const sessionsList: AirtableSession[] = await fetchAirtableRecords("Sessions");
                for (const session of sessionsList) {
                    if (session.fields["Restaurant Name"][0].toLowerCase() == businessName.toLowerCase() && session.fields["Table Number"][0] == tableNumber && session.fields.Status == "Open") {
                        setSession(session)
                        break;
                    }
                    // I can do something if there is no open session
                }
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
        //const newCart = filter_Cart(cart)
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

    function DecrementProduct(id: string) {
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            if (item.id == id) {
                if (cart[i].quantity == 1) {
                    delete cart[i];
                    setCart(filter_Cart(cart))
                    return;
                } else {
                    cart[i].quantity--;
                    setCart(filter_Cart(cart))
                    return cart[i]
                }


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


    function handleSubmit() {
        const Items = cart.map((item) => item)
        if (session != null) {
            for (const item of Items) {
                if (item.aditionalNote == undefined) {
                    addRecord("Orders", {
                        "Item": item.id,
                        "Quantity": item.quantity,
                        "Session ID": [session?.id]
                    })
                } else {
                    addRecord("Orders", {
                        "Item": item.id,
                        "Quantity": item.quantity,
                        "Session ID": [session?.id],
                        "Aditional Note": item.aditionalNote
                    })
                }
            }
        }
        setCart([])
    }

    if (error != null) return <div>{error}</div>


    return (
        <div className='font-poppins absolute min-w-full bg-gray-200 min-h-full pb-32'>
            <div className='flex relative justify-between items-center mx-6 mt-7'>
                <Link to={`/neemble-eat/b/${encodedBusinessName}/${tableNumber}`} className='absolute flex-none'>
                    <div className="text-left">
                        <p className='text-lg font-bold pr-3'>
                            {'<'}
                        </p>
                    </div>
                </Link>
                <div className='flex-grow'></div>
                <div className='flex-none text-center '>
                    Menu
                </div>
                <div className='flex-grow'></div>
            </div>
            <div className='mt-5 mx-6'>
                {numberOfItems == 1 ?
                    <p>
                        {numberOfItems} item
                    </p> :
                    <p>
                        {numberOfItems} items
                    </p>
                }
            </div>
            <div className='mx-0 mb-32 divide-y divide-gray-300'>
                {
                    cart.map((item, index: number) =>
                            item != undefined && <div key={index} className='mt-3'>
                                <CartSingleItem
                                    decrement={DecrementProduct}
                                    increment={IncrementProduct}
                                    cartProduct={item}
                                    placeName={businessName}
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
                                <p className='text-sm text-zinc-700'>
                                    Total
                                </p>
                            </div>
                            <div>
                                <h2 className=' font-semibold text-lg'>
                                    Kz {totalValue}
                                </h2>
                            </div>
                        </div>
                        <div className='flex justify-center mt-4'>
                            <div className='flex bg-black text-white rounded-3xl w-full py-4 text-sm justify-center'
                                 onClick={handleSubmit}>
                                Order
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Cart;