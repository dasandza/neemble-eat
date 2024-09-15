import {useEffect, useState} from "react";
import formatDateString from "../utils/DateFormat.tsx";
import {Link, useParams} from "react-router-dom";
import {LoadingOrders} from "./LoadingPages";
import SwipeToConfirmButton from "../Components/SwipeToConfirmButton.tsx";
import {ArrowDropdown} from "../assets/icons";
import MulticaixaExpressLogo from "../assets/images/MCX_Express.png"
import {OrderJson, TableSessionJson} from "../schema.ts";
import {closeSession, fetchAllSessionOrders, fetchRestaurantOpenTable} from "../api";


function Orders() {

    document.title = "Pedidos"

    const {restaurantID, menuID, tableNumber} = useParams() as unknown as {
        restaurantID: string,
        menuID: string,
        tableNumber: number
    };

    const [customerName, setCustomerName] = useState<string>("")
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [orders, setOrders] = useState<Array<OrderJson>>([])
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [sessionPrice, setSessionPrice] = useState<number>(0)
    const [session, setSession] = useState<TableSessionJson | null>()
    const [tip, setTip] = useState<number>(0);
    const [paymentMethodShowing, setPaymentMethodShowing] = useState<boolean>(false)
    //const [paymentSelected, setPaymentSelected] = useState<string>("")


    useEffect(() => {
        async function fetchData() {
            try {
                const session = await fetchRestaurantOpenTable({restaurantID: restaurantID, tableNumber: tableNumber})
                const orders = await fetchAllSessionOrders({sessionID: session.id})
                setSession(session)
                setOrders(orders)
                setLoading(false)
                sessionStorage.setItem("Session", JSON.stringify(session))
            } catch (err) {
                setError('Failed to fetch data');
                console.error("Error fetching data:", err);
            }
        }

        fetchData().then(r => r);
    }, []);


    useEffect(() => {
        if (orders) {
            let total = 0
            for (const order of orders) {
                total += order.prepStatus != "Cancelled" ? order.total : 0
            }
            setSessionPrice(total)
        }

    }, [orders]);


    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    function handleTipChange(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.target.value
        setTip(Number(val))
    }

    function toggleShowPaymentMethods() {
        if ((sessionPrice + tip) != 0) {
            setPaymentMethodShowing(!paymentMethodShowing)
        }

    }

    function handleGetBill() {
        if (session == null) return;

        closeSession({sessionID: session.id, status: "Billed"})
            .then((newSession) => {
                setOrders([])
                const customerName = sessionStorage.getItem('CustomerName');
                if (customerName != "" && customerName) {
                    setCustomerName(customerName)
                }
                togglePopup()
                sessionStorage.clear();
                sessionStorage.setItem("Session", JSON.stringify(newSession))
            })
            .catch((error) => console.error(error))
        setOrders([])
        const customerName = sessionStorage.getItem('CustomerName');
        if (customerName != "" && customerName) {
            setCustomerName(customerName)
        }
        togglePopup()
        sessionStorage.clear();
    }


    if (loading) return <LoadingOrders/>;

    if (error) return <div>{error}</div>;

    return (
        <div className='min-h-svh px-4 font-poppins pt-7'>
            <div className={`bg-gray-200 fixed w-full h-dvh top-0 left-0 -z-10`}></div>
            <div className='flex relative justify-between items-center mb-5'>
                <Link to={`/neemble-eat/menu/${restaurantID}/${menuID}/${tableNumber}`} className='absolute flex-none'>
                    <div className="text-left">
                        <p className='text-lg font-bold pr-4'>
                            {'<'}
                        </p>
                    </div>
                </Link>
                <div className='flex-grow'></div>
                <div className='flex-none text-center font-semibold'>
                    Pedidos
                </div>
                <div className='flex-grow'></div>
            </div>

            <div>
                <h1 className='text-lg font-semibold'>
                    Pedidos recentes
                </h1>
                <p className='text-sm text-zinc-600'>
                    Abaixo estão os seus pedidos
                </p>
            </div>
            {
                orders.length == 0 ?
                    <div className='w-full h-fit fixed top-1/2 left-0 flex items-center'>
                        <div className={`w-1/3 h-1 `}></div>
                        <p className='text-gray-500 text-center w-1/3'>
                            Nenhum pedido
                        </p>
                        <div className={`w-1/3 h-1`}></div>
                    </div> :
                    <div className='bg-white shadow-sm py-3 px-3 rounded-2xl mt-3'>
                        {
                            orders.map((order, index) => (
                                <div key={index}
                                     className='item'>
                                    <div className='flex justify-between items-center text-sm'>
                                        <div>
                                            <div className='flex'>
                                                <p className='font-semibold'>Pedido:&nbsp;</p>
                                                <p className='truncate w-32'>
                                                    {order.orderedItemName}
                                                </p>
                                                <p>
                                                    x {order.quantity}
                                                </p>
                                            </div>
                                            <p className='text-sm text-gray-400'>
                                                {formatDateString(order.orderTime)}
                                            </p>
                                        </div>
                                        <div className='text-sm'>
                                            <div className='flex'>

                                                <p className={`font-semibold ${order.prepStatus == "Cancelled" && "line-through italic"}`}>
                                                    {order.unitPrice * order.quantity}.00
                                                </p>
                                                <p>&nbsp;Kz</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='my-2'>
                                        {
                                            order.prepStatus == "Done" ?
                                                <p className='bg-green-100 border border-green-600 font-semibold text-green-600 w-fit text-sm px-2 py-0.5 rounded-lg flex justify-center items-center'>
                                                    Pronto
                                                </p> :
                                                order.prepStatus == "Cancelled" ?
                                                    <p className='bg-red-100 border border-red-600 font-semibold text-red-600 w-fit text-sm px-2 py-0.5 rounded-lg flex justify-center items-center'>
                                                        Cancelado
                                                    </p> :
                                                    <p className='bg-purple-100 border border-purple-600 font-semibold text-purple-600 w-fit text-sm px-2 py-0.5 rounded-lg flex justify-center items-center'>
                                                        A ser preparado
                                                    </p>
                                        }

                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
            {orders.length != 0 &&
                <div>
                    <div className='bg-white -mb-1 shadow-sm py-3 px-3.5 rounded-3xl mt-3'>
                        <div className='flex items-center justify-between border-b border-gray-100 pb-3'>
                            <label htmlFor="tipInput" className='text-sm font-poppins-semibold'>Gorjeta</label>
                            <div className='flex items-center space-x-1'>
                                <input type="number"
                                       id="tipInput"
                                       value={tip.toFixed()}
                                       onChange={handleTipChange}
                                       className='border-b rounded-b-none text-base hover:bordert-none border-gray-500 w-20'
                                       placeholder='0.00'
                                       style={{
                                           // Hide the spinner controls
                                           WebkitAppearance: 'none',
                                           MozAppearance: 'textfield',
                                       }}/>
                                <p className='text-gray-600 italic text-sm'>
                                    Kz
                                </p>
                            </div>

                        </div>
                        {
                            tip != 0 &&
                            <div className='w-full flex justify-between mt-3'>
                                <h1 className='font-semibold text-sm'>
                                    Consumo
                                </h1>
                                <p className=' text-sm text-zinc-800'>
                                    {sessionPrice} Kz
                                </p>
                            </div>
                        }
                        <div className='flex items-end mt-3 justify-between '>
                            <div className='space-y-2 bg-red-5'>
                                <div>
                                    <h1 className='font-semibold text-sm'>
                                        Total
                                    </h1>
                                    <p className=' text-zinc-800 text-xl'>
                                        {sessionPrice + tip} Kz
                                    </p>
                                </div>

                            </div>
                            <div>
                                <button
                                    className={`px-7 py-3 ${(sessionPrice + tip) == 0 ? "bg-gray-400 cursor-not-allowed" : "bg-black"} text-sm text-white rounded-3xl `}
                                    onClick={toggleShowPaymentMethods}>
                                    Pedir Conta
                                </button>
                            </div>
                        </div>
                        {
                            paymentMethodShowing && <div className='mt-3 border-t border-gray-100 pt-3'>
                                <div className='flex mb-3 items-center'>
                                    <h1 className='mr-2'>
                                        Selecione o mêtodo de pagamento
                                    </h1>
                                    <ArrowDropdown
                                        className='cursor-pointer'
                                        onClick={toggleShowPaymentMethods}/>
                                </div>

                                <div className='space-y-3'>
                                    <SwipeToConfirmButton label="Cash"
                                                          onConfirm={handleGetBill}
                                                          color="bg-green-500"
                                                          icon={<div></div>}/>
                                    <SwipeToConfirmButton label="Cartão"
                                                          onConfirm={handleGetBill}
                                                          color="bg-black"
                                                          icon={<div></div>}/>
                                    <SwipeToConfirmButton label=""
                                                          onConfirm={handleGetBill}
                                                          color="bg-orange-600"
                                                          icon={<img src={MulticaixaExpressLogo} alt=""
                                                                     className='h-20'/>}/>
                                </div>
                            </div>
                        }

                    </div>
                    <div>
                        <div className='text-[12px] italic text-gray-400 ml-2 pt-8 pb-32'>
                            <p><span className='font-semibold not-italic'>Obs:&nbsp;</span>Quando estiver satisfeito(a),
                                clique no
                                botão acima para pedir a sua conta facilmente.</p>
                        </div>
                    </div>
                </div>
            }

            {
                isPopupOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
                        <div className="relative w-11/12 max-w-lg p-6 bg-white rounded shadow-lg ">
                            <button
                                onClick={togglePopup}
                                className="absolute top-0 right-0 mt-3 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                                &times;
                            </button>
                            <h2 className=" mt-4 mb-2 text-xl font-bold">
                                A sua conta esta à caminho{customerName != "" && customerName ? `, ${customerName}!` : "!"}
                            </h2>
                            <p className="mb-4 text-[14px]">
                                A conta chegará a sua mesa em questão de minutos. Obrigado pelo tempo que esteve
                                connosco, volte sempre!
                            </p>
                            <button
                                onClick={togglePopup}
                                className="px-7 py-1 text-white bg-black rounded-md focus:outline-none"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
        ;
}

export default Orders;