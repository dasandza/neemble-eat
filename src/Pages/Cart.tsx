import {CartPopUp, ItemsSection, NumberOfItems, CheckOut} from "../Components/Cart";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {addOrder} from "../api";
import useOpenSession from "../api/functions/fetchRestaurantOpenTable.ts";
import {useQueryClient} from "@tanstack/react-query";
import useCart from "../hooks/useCart.ts";
import Background from "../Components/ui/Background.tsx";
import {CartContext} from "../context/cartContext.ts";
import ReturnNav from "../Components/ui/ReturnNav.tsx";
import Layout from "../Components/ui/Layout.tsx";


function Cart() {

    document.title = "Carrinho"

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [customerName, setCustomerName] = useState<string>('');


    const queryClient = useQueryClient()
    const cart = useCart()
    const {restaurantID, menuID, tableNumber} = useParams() as unknown as {
        restaurantID: string,
        menuID: string,
        tableNumber: number
    };
    const {session, sessionError, isSessionLoading} = useOpenSession({
        restaurantID: restaurantID,
        tableNumber: tableNumber
    })

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    function invalidateOrdersKey(sessionID: string) {
        queryClient.invalidateQueries({
            queryKey: ["orders", sessionID]
        }).then()
    }

    function handleSubmit() {
        const items = cart.cart.map((item) => item)

        if (session && session?.id) {
            for (const item of items) {
                addOrder({
                    sessionID: session?.id,
                    itemID: item.id,
                    quantity: item.quantity,
                    additionalNote: item.aditionalNote
                }).catch((error) => console.error(error))
            }
            if (session && session.id)
                invalidateOrdersKey(session.id)
        }
        cart.setCartEmpty()
        togglePopup()
    }

    if (sessionError) return <div>{sessionError.message}</div>

    if (isSessionLoading) return <div>Loading...</div>


    return (
        <CartContext.Provider value={{
            menuID: menuID,
            tableNumber: tableNumber,
            togglePopUp: togglePopup,
            customerName: customerName,
            setCustomerName: setCustomerName,
            restaurantID: restaurantID,
            cart: cart
        }}>
            <div className="prevent-select">
                <Layout>
                    <Background color={"bg-gray-100"}>
                        <ReturnNav path={`/neemble-eat/menu/${restaurantID}/${menuID}/${tableNumber}`}
                                   pageName={"Carrinho"}/>
                        <NumberOfItems/>
                        <ItemsSection/>
                        <CheckOut handleSubmit={handleSubmit}/>
                        {isPopupOpen && <CartPopUp/>}
                    </Background>
                </Layout>
            </div>
        </CartContext.Provider>
    );
}

export default Cart;