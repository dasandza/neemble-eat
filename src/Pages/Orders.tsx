import fetchAirtableRecords from "../utils/fetcher.ts";
import {useEffect, useState} from "react";
import {
    AirtableOrders,
    OrdersPageParams,
    UpdateFieldsParams,
    AirtableSession,
    AirtableTable
} from "../interfaces.tsx";
import formatDateString from "../utils/DateFormat.tsx";
import {Link, useParams} from "react-router-dom";
import {decodeString} from "../utils/urlhandler.ts";
import updateFieldsInAirtable from "../utils/updateFieldsInAirtable.ts";
import addRecord from "../utils/writeAirtable.ts";
import LoadingOrders from "./LoadingPages/LoadingOrders.tsx";
import SwipeToConfirmButton from "../Components/SwipeToConfirmButton.tsx";
import {ArrowDropdown} from "../assets/icons";
import MulticaixaExpressLogo from "../assets/images/MCX_Express.png"


function Orders() {


    const [sessionInitiated, setSessionInitiated] = useState<boolean>(false)
    const [customerName, setCustomerName] = useState<string>("")
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [table, setTable] = useState<AirtableTable>()
    const [orders, setOrders] = useState<Array<AirtableOrders>>([])
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [sessionPrice, setSessionPrice] = useState<number>(0)
    const {encodedBusinessName, tableNumber} = useParams() as unknown as OrdersPageParams;
    const restaurantName = decodeString(encodedBusinessName)
    const [session, setSession] = useState<AirtableSession | null>()
    const [closeEmptySession, setCloseEmptySession] = useState<boolean>(false)
    const [tip, setTip] = useState<number>(0);
    const [paymentMethodShowing, setPaymentMethodShowing] = useState<boolean>(false)
    //const [paymentSelected, setPaymentSelected] = useState<string>("")


    useEffect(() => {
        async function fetchData() {
            try {
                const ordersList: AirtableOrders[] = await fetchAirtableRecords("Orders");
                const sessionsList: AirtableSession[] = await fetchAirtableRecords("Sessions");
                for (const session of sessionsList) {
                    if (session.fields["Restaurant Name"][0].toLowerCase() == restaurantName.toLowerCase() && session.fields["Table Number"][0] == tableNumber && session.fields.Status == "Open") {
                        if (session.fields.Orders && session.fields.Total == 0) {
                            const name = "Sessions"
                            const recordId = session.id
                            const fieldsToUpdate = {"Status": "Cancelled"}
                            console.log(sessionInitiated)
                            if (!sessionInitiated && orders != undefined) {
                                updateFieldsInAirtable({
                                    tableName: name,
                                    recordId: recordId,
                                    fieldsToUpdate: fieldsToUpdate
                                }).then(() => {
                                    addRecord("Sessions", {
                                        "Table": session.fields.Table
                                    }).then(newRecordID => {
                                        session.id = newRecordID
                                        session.fields["Session Number"] = (Number(session.fields["Session Number"]) + 1).toString()
                                        session.fields.Orders = []
                                        sessionsList.push(session)
                                    })
                                })
                                setSession(session)
                                setOrders([]);
                                setSessionInitiated(true)
                            }
                            break;
                        } else {
                            if (!sessionInitiated) {
                                setSession(session)
                                setOrders(ordersList.filter((order) => {
                                    return order.fields["Session ID"][0] === session.id
                                }));
                                setSessionInitiated(true)
                            }

                            break;

                        }
                    }
                    // I can do something if there is no open session
                }
                const tablesList: AirtableTable[] = await fetchAirtableRecords("Tables");
                for (const table of tablesList) {
                    if (table.fields.Number == tableNumber && table.fields["Name (from Restaurant)"][0].toLowerCase() == restaurantName.toLowerCase()) {
                        setTable(table)
                        break;
                    }
                    // I can do something if there is no open session
                }
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch data');
                console.error("Error fetching data:", err);
            }
        }

        fetchData().then(r => r);
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                if (error != null) {
                    const ordersList: AirtableOrders[] = await fetchAirtableRecords("Orders");
                    const sessionsList: AirtableSession[] = await fetchAirtableRecords("Sessions");
                    for (const session of sessionsList) {
                        if (session.fields["Restaurant Name"][0].toLowerCase() == restaurantName.toLowerCase() && session.fields["Table Number"][0] == tableNumber && session.fields.Status == "Open") {
                            if (session.fields.Orders && session.fields.Total == 0) {
                                const name = "Sessions"
                                const recordId = session.id
                                const fieldsToUpdate = {"Status": "Cancelled"}
                                if (!sessionInitiated && orders != undefined) {
                                    updateFieldsInAirtable({
                                        tableName: name,
                                        recordId: recordId,
                                        fieldsToUpdate: fieldsToUpdate
                                    }).then(() => {
                                        addRecord("Sessions", {
                                            "Table": session.fields.Table
                                        }).then(newRecordID => {
                                            session.id = newRecordID
                                            session.fields["Session Number"] = (Number(session.fields["Session Number"]) + 1).toString()
                                            session.fields.Orders = []
                                            sessionsList.push(session)
                                        })
                                    })
                                    setSession(session)
                                    setOrders([]);
                                    setSessionInitiated(true)
                                }

                                break;
                            } else {
                                if (!sessionInitiated) {
                                    setSession(session)
                                    setOrders(ordersList.filter((order) => {
                                        return order.fields["Session ID"][0] === session.id
                                    }));
                                    setSessionInitiated(true)
                                }
                                break;

                            }
                        }
                        // I can do something if there is no open session
                    }
                    const tablesList: AirtableTable[] = await fetchAirtableRecords("Tables");
                    for (const table of tablesList) {
                        if (table.fields.Number == tableNumber && table.fields["Name (from Restaurant)"][0].toLowerCase() == restaurantName.toLowerCase()) {
                            setTable(table)
                            break;
                        }
                        // I can do something if there is no open session
                    }
                    setLoading(false)
                }
            } catch (err) {
                setError('Failed to fetch data');
                console.error("Error fetching data:", err);
            }
        }

        fetchData().then(r => r);
    }, [error]);


    useEffect(() => {
        let total = 0
        for (const order of orders) {
            total += (Number(order.fields.Total))
        }
        setSessionPrice(total)
    }, [orders]);

    async function verifySessions() {
        try {
            const sessionsList: AirtableSession[] = await fetchAirtableRecords("Sessions");
            setCloseEmptySession(sessionsList.filter((session) => {
                return session.fields["Restaurant Name"][0].toLowerCase() === restaurantName.toLowerCase() && session.fields["Table Number"][0] === tableNumber && session.fields.Status === "Open" && session.fields.Orders.length == 0
            }).length == 1)
        } catch (err) {
            setCloseEmptySession(false)
            //setError(`Failed to fetch data: ${error}`);
            console.error("Error fetching data:", err);
        }
    }

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
        if (table == null) return;
        // Example usage:
        const params: UpdateFieldsParams = {
            tableName: 'Sessions',
            recordId: session?.id,
            fieldsToUpdate: {
                "Status": 'Billed',
            },
        };
        verifySessions().then(r => r)
        if (!closeEmptySession) {
            updateFieldsInAirtable(params).catch(console.error);
            addRecord("Sessions", {"Table": [table?.id]}).then(r => r)
        }
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
        <div className='min-h-svh px-4 bg-gray-100 font-poppins pt-7'>
            <div className='flex relative justify-between items-center mb-5'>
                <Link to={`/neemble-eat/b/${encodedBusinessName}/${tableNumber}`} className='absolute flex-none'>
                    <div className="text-left">
                        <p className='text-lg font-bold pr-4'>
                            {'<'}
                        </p>
                    </div>
                </Link>
                <div className='flex-grow'></div>
                <div className='flex-none text-center font-semibold'>
                    Menu
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
            {orders.length == 0 &&
                <div className='h-svh w-full  flex items-center justify-center'>
                    <p className='text-gray-500'>
                        Nenhum pedido ainda
                    </p>
                </div>
            }
            {orders.length != 0 &&
                <div className='bg-white shadow-sm py-2 px-3 rounded-xl mt-3'>
                    {
                        orders.map((order, index) => (
                            <div key={index}
                                 className='item'>
                                <div className='flex justify-between items-center text-sm'>
                                    <div>
                                        <div className='flex'>
                                            <p className='font-semibold'>Pedido:&nbsp;</p>
                                            <p className='truncate w-32'>
                                                {order.fields["Name (from Item)"]}
                                            </p>
                                            <p>
                                                x {order.fields.Quantity}
                                            </p>
                                        </div>
                                        <p className='text-sm text-gray-400'>
                                            {formatDateString(order.fields["Time Created"])}
                                        </p>
                                    </div>
                                    <div className='text-sm'>
                                        <div className='flex'>

                                            <p className={`font-semibold ${order.fields["Order Status"] == "Cancelled" && "line-through italic"}`}>
                                                {order.fields["Price (from Item)"] * order.fields.Quantity}.00
                                            </p>
                                            <p>&nbsp;Kz</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='my-2'>
                                    {
                                        order.fields["Order Status"] == "Done" ?
                                            <p className='bg-green-100 border border-green-600 font-semibold text-green-600 w-fit text-sm px-2 py-0.5 rounded-lg flex justify-center items-center'>
                                                Pronto
                                            </p> :
                                            order.fields["Order Status"] == "Cancelled" ?
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