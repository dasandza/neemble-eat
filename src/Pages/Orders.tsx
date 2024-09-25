import {useState} from "react";
import {useParams} from "react-router-dom";
import {LoadingOrders} from "./LoadingPages";
import {closeSession} from "../api";
import Loading from "./LoadingPages/Loading.tsx";
import useOpenSession from "../api/functions/fetchRestaurantOpenTable.ts";
import useSessionOders from "../api/functions/fetchAllSessionOrders.ts";
import Background from "../Components/ui/Background.tsx";
import ReturnNav from "../Components/ui/ReturnNav.tsx";
import {ClosingSessionCompletePopUp, NoOrders, PaymentSection, YourOrdersBelow} from "../Components/Orders";
import {OrdersContext} from "../context/ordersContext.ts";
import OrdersDisplay from "../Components/Orders/components/OrdersDisplay.tsx";
import Layout from "../Components/ui/Layout.tsx";


function Orders() {

    document.title = "Pedidos"

    const {restaurantID, menuID, tableNumber} = useParams() as unknown as {
        restaurantID: string,
        menuID: string,
        tableNumber: number
    };

    const [customerName, setCustomerName] = useState<string>("")
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    const {
        session,
        sessionError,
        isSessionLoading,
        closeSessionMutation
    } = useOpenSession({
        restaurantID: restaurantID,
        tableNumber: tableNumber,
        closeSession: async () => handleGetBill()
    })

    const {
        orders,
        ordersError,
        isOrdersLoading,
        isFetchingOrders,
        refreshOrders
    } = useSessionOders({
        sessionID: session ? session.id : null
    })

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    function handleGetBill() {
        if (session == null) return;

        closeSession({sessionID: session.id, status: "Billed"})
            .then(() => {
                const customerName = sessionStorage.getItem('CustomerName');
                if (customerName != "" && customerName) {
                    setCustomerName(customerName)
                }
                togglePopup()
            })
            .catch((error) => console.error(error))
        const customerName = sessionStorage.getItem('CustomerName');
        if (customerName != "" && customerName) {
            setCustomerName(customerName)
        }
        togglePopup()
    }

    if (ordersError || sessionError) {
        return <div>
            {sessionError && <div>
                There was an error while fetchin the session: {sessionError.message}
            </div>
            }
            {ordersError && <div>
                There was an error while fetchin the orders: {ordersError.message}
            </div>
            }
        </div>
    }


    return (
        <Loading LoadingPage={LoadingOrders}
                 loadingParams={[isSessionLoading, isOrdersLoading]}>
            <OrdersContext.Provider value={{
                closeSessionMutation: closeSessionMutation,
                refreshOrders: refreshOrders,
                orders: orders,
                isFetchingOrders: isFetchingOrders
            }}>
                <Layout>
                    <Background color={`bg-gray-100`}>
                        <ReturnNav path={`/neemble-eat/menu/${restaurantID}/${menuID}/${tableNumber}`}
                                   pageName={"Pedidos"}/>

                        <YourOrdersBelow/>
                        {
                            orders &&
                            orders.length == 0 ?
                                <NoOrders/> :
                                <div>
                                    <OrdersDisplay/>
                                    <PaymentSection/>
                                </div>
                        }
                        {
                            isPopupOpen &&
                            <ClosingSessionCompletePopUp customerName={customerName} togglePopUp={togglePopup}/>
                        }
                    </Background>
                </Layout>
            </OrdersContext.Provider>
        </Loading>
    )
        ;
}

export default Orders;