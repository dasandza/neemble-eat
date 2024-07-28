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

function Orders() {

    const [table, setTable] = useState<AirtableTable>()
    const [orders, setOrders] = useState<Array<AirtableOrders>>([])
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [sessionPrice, setSessionPrice] = useState<number>(0)
    const {encodedBusinessName, tableNumber} = useParams() as unknown as OrdersPageParams;
    const restaurantName = decodeString(encodedBusinessName)
    const [session, setSession] = useState<AirtableSession | null>()
    const [closeEmptySession, setCloseEmptySession] = useState<boolean>(false)


    useEffect(() => {
        async function fetchData() {
            try {
                const ordersList: AirtableOrders[] = await fetchAirtableRecords("Orders");
                for (const order of ordersList) {
                    console.log(order.id)
                }
                const sessionsList: AirtableSession[] = await fetchAirtableRecords("Sessions");
                for (const session of sessionsList) {
                    if (session.fields["Restaurant Name"][0].toLowerCase() == restaurantName.toLowerCase() && session.fields["Table Number"][0] == tableNumber && session.fields.Status == "Open") {
                        setSession(session)
                        console.log("SESSION:", session.id)
                        setOrders(ordersList.filter((order) => {
                            return order.fields["Session ID"][0] === session.id
                        }));

                        break;
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

        fetchData();
    }, []);


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
        verifySessions()
        if (!closeEmptySession) {
            updateFieldsInAirtable(params).catch(console.error);
            addRecord("Sessions", {"Table": [table?.id]})
        }
        setOrders([])
    }


    if (loading) return <div className='h-screen flex flex-col justify-center items-center'>
        <h1 className='font-semibold'>{restaurantName}</h1>

        <p>Orders</p>
    </div>;

    if (error) return <div>{error}</div>;

    return (
        <div className='min-h-svh px-4 bg-gray-100 font-poppins pt-7'>
            <div className='flex relative justify-between items-center mb-5'>
                <Link to={`/b/${encodedBusinessName}/${tableNumber}`} className='absolute flex-none'>
                    <div className="text-left">
                        <p className='text-lg font-bold pr-4'>
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
            <div>
                <h1 className='text-lg font-semibold'>
                    Recent Orders
                </h1>
                <p className='text-sm text-zinc-600'>
                    Below are your most recent orders
                </p>
            </div>
            {orders.length == 0 &&
                <div className='h-svh w-full  flex items-center justify-center'>
                    <p className='text-gray-500'>
                        You did not order anything yet
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
                                            <p className='font-semibold'>Order:&nbsp;</p>
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

                                            <p className='font-semibold'>{order.fields.Total}.00</p>
                                            <p>&nbsp;Kz</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='my-2'>
                                    {order.fields["Order Status"] == "In progress" ?
                                        <p className='bg-purple-100 border border-purple-600 font-semibold text-purple-600 w-fit text-sm px-2 py-0.5 rounded-lg flex justify-center items-center'>
                                            {order.fields["Order Status"]}
                                        </p> :
                                        <p className='bg-amber-100 border border-amber-600 font-semibold text-amber-600 w-fit text-sm px-2 py-0.5 rounded-lg flex justify-center items-center'>
                                            {order.fields["Order Status"]}
                                        </p>
                                    }
                                </div>
                            </div>
                        ))
                    }

                </div>
            }
            {orders.length != 0 &&
                <div className='bg-white -mb-1 shadow-sm py-3 px-1.5 rounded-3xl mt-3'>
                    <div className='flex items-center justify-between px-2'>
                        <div>
                            <h1 className='font-semibold text-sm'>
                                Total to Pay
                            </h1>
                            <p className=' text-sm text-zinc-800'>
                                {sessionPrice} Kz
                            </p>
                        </div>
                        <div>
                            <button className='px-7 py-3 bg-black text-sm text-white rounded-3xl'
                                    onClick={handleGetBill}>
                                Get The Bill
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Orders;