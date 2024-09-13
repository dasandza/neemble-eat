import {useEffect, useState} from "react";
import OrderListingItem from "../Components/OrderListingItem.tsx";
import filterLastXhOrders from "../utils/filterLastXhOrders.ts";
import {
    CharmCross,
    ClockIcon,
    CutleryIcon,
    HamburgerMenuIcon,
    PriceTag,
    QrCode,
    SortAscending,
    SortDescending
} from "../assets/icons";
import timeCalculator from "../utils/TimeCalculator.ts";
import {OrderJson, OrderStatus} from "../schema.ts";
import {useParams} from "react-router-dom";
import {fetchAllRestaurantOrders} from "../api";
import UpdateOrder from "../api/functions/updateOrder.tsx";
import {apiUrl} from "../api/functions/key.ts";


interface filterProps {
    name: string,
    tag: string,
}


function OrdersInterface() {

    const BASE_URL = apiUrl

    const {restaurantID} = useParams() as unknown as { restaurantID: string }
    const [orders, setOrders] = useState<OrderJson[]>([]);


    const [orderSelected, setOrderSelected] = useState<OrderJson | null>(null)
    const [filteredOrders, setFilteredOrders] = useState<OrderJson[]>([])
    const [filterMode, setFilterMode] = useState<filterProps>({name: "Todos", tag: "All"})
    const [ascendingSorting, setAscendingSorting] = useState<boolean>(false)

    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState<boolean>(false)
    const [isTableSelectMenuOpen, setIsTableSelectMenuOpen] = useState(false);
    const [allTablesNumbers, setAllTablesNumbers] = useState<string[]>(["Todas"])
    const [tableSelection, setTableSelection] = useState("Todas")

    const filterModes: filterProps[] = [
        {name: "Todos", tag: "All"},
        {name: "Novos", tag: "New"},
        {name: "Em Preparo", tag: "In Progress"},
        {name: "Prontos", tag: "Done"},
        {name: "Cancelados", tag: "Cancelled"},
    ]


    useEffect(() => {
        async function fetch() {
            const data = await fetchAllRestaurantOrders({restaurantID: restaurantID})
            const initial = data.filter((order) => {
                return filterLastXhOrders(order) && order.sessionStatus !== "Billed";
            })
            setOrders(initial)
            setFilteredOrders(sortOrdersByDate(initial, ascendingSorting))
            const temp = allTablesNumbers
            for (const order of initial) {
                if (!temp.includes(order.tableNumber?.toString())) {
                    temp.push(order.tableNumber.toString())
                }
            }
            setAllTablesNumbers(temp)
        }

        fetch().then(() => {
        })
    }, []);


    useEffect(() => {
        let ws: WebSocket;
        const connectWebSocket = () => {
            // Using protocol-relative URL to switch between ws and wss dynamically
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

            try {
                ws = new WebSocket(`${protocol}//${BASE_URL}/ws/${restaurantID}/order`);
            } catch (error) {
                console.log("ERROR: ", error)
            }

            ws.onopen = () => {
                console.log('WebSocket Connected');
            };

            ws.onmessage = (event) => {
                try {
                    const order: OrderJson = JSON.parse(event.data);
                    if (!allTablesNumbers.includes(order.tableNumber.toString())) {
                        setAllTablesNumbers(prev => [...prev, order.tableNumber.toString()]);
                    }
                    setOrders(prev => [...prev, order]);
                } catch (error) {
                    console.error('Error parsing message data:', error);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket Error:', error);
                console.log('Reconnecting WebSocket...');
                setTimeout(connectWebSocket, 3000);
            };

            ws.onclose = (event) => {
                console.log('WebSocket Disconnected: ', event);
                if (!event.wasClean) {
                    console.log('Reconnecting WebSocket...');
                    setTimeout(connectWebSocket, 2000); // Try to reconnect every 2 seconds
                } else {
                    setTimeout(connectWebSocket, 3000);
                }
            };
        };

        connectWebSocket()

        return () => {
            if (ws) {
                console.log('Cleaning up WebSocket connection...');
                ws.close();
            }
        };

    }, [restaurantID]);


    useEffect(() => {
        let ws: WebSocket;
        const connectWebSocket = () => {
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            ws = new WebSocket(`${protocol}//${BASE_URL}/ws/${restaurantID}/billed`);

            ws.onopen = () => {
                console.log('WebSocket Connected');
            };

            ws.onmessage = (event) => {
                try {
                    const billedOrders: OrderJson[] = JSON.parse(event.data);
                    const billedOrdrsIDs = billedOrders.map((order) => order.id)
                    setOrders(orders.filter((order) => !billedOrdrsIDs.includes(order.id)));
                } catch (error) {
                    console.log(`Error parsing the data: ${error}`)

                }

            };

            ws.onerror = (error) => {
                console.error('WebSocket Error:', error);
                console.log('Reconnecting WebSocket...');
                setTimeout(connectWebSocket, 3000);
            };

            ws.onclose = (event) => {
                console.log('WebSocket Disconnected: ', event);
                if (!event.wasClean) {
                    console.log('Reconnecting WebSocket...');
                    setTimeout(connectWebSocket, 3000); // Try to reconnect every 3 seconds
                } else {
                    setTimeout(connectWebSocket, 3000);
                }
            };
        };

        connectWebSocket();

        return () => {
            if (ws) {
                console.log('Cleaning up WebSocket connection...');
                ws.close();
            }
        };

    }, [restaurantID]);


    useEffect(() => {
        const ordersByCategory = filterMode.tag == "All" ? orders : orders.filter(order => order.prepStatus == filterMode.tag)

        if (tableSelection == "Todas") {
            setFilteredOrders(sortOrdersByDate(ordersByCategory, ascendingSorting))
        } else {
            setFilteredOrders(sortOrdersByDate(ordersByCategory.filter(order => order.tableNumber == Number(tableSelection)), ascendingSorting))
        }
    }, [orders]);


    function filterOrders(mode: filterProps) {
        setFilterMode(mode)
        if (orders.length != 0) {
            if (mode.tag != "All") {
                setFilteredOrders(orders.filter(order => order.prepStatus == mode.tag))
            } else {
                setFilteredOrders(orders)
            }
            const temp = allTablesNumbers
            for (const order of orders) {
                if (!temp.includes(order.tableNumber?.toString())) {
                    temp.push(order.tableNumber.toString())
                }
            }
            setAllTablesNumbers(temp)
        }
    }


    function sortOrdersByDate(orders: OrderJson[], ascending: boolean = true): OrderJson[] {
        return orders.sort((a, b) => {
            const dateA = new Date(a.orderTime);
            const dateB = new Date(b.orderTime);
            return ascending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        });
    }


    function toggleHamburgerMenu() {
        setIsLeftMenuOpen(!isLeftMenuOpen)
    }

    function toggleSortingOrder() {
        setAscendingSorting(!ascendingSorting)
        setFilteredOrders(sortOrdersByDate(filteredOrders, !ascendingSorting))
    }

    const toggleDropdown = () => {
        setIsTableSelectMenuOpen(!isTableSelectMenuOpen);
    };

    function updateStatus(newStatus: string) {
        if (orderSelected) {
            orderSelected.prepStatus = newStatus == "cancel" ? "Cancelled" as OrderStatus : newStatus == "in-progress" ? "In Progress" as OrderStatus : "Done" as OrderStatus
            setOrders(orders.map((order) => orderSelected.id == order.id ? orderSelected : order))
            UpdateOrder({orderID: orderSelected?.id, newStatus: newStatus}).then()
        }
    }

    function selectTable(table: string) {
        setTableSelection(table)
        toggleDropdown()
        if (table == "Todas") {
            setFilteredOrders(orders)
        } else {
            setFilteredOrders(orders.filter(order => order.tableNumber == Number(table)))
        }

    }


    return (
        <div>
            <div
                className={`laptop:hidden py-16 divide-y divide-gray-100 fixed z-50 bg-white transition-all ease-in-out duration-300 ${!isLeftMenuOpen ? "-translate-x-full" : "translate-x-0"} h-dvh w-[60%] top-0 left-0`}>
                {
                    filterModes.map((mode, index) => (
                        <div key={index}
                             onClick={() => {
                                 filterOrders(mode);
                                 toggleHamburgerMenu()
                             }}
                             className={`${mode.tag == filterMode.tag ? "bg-black text-white" : "text-gray-700"} py-3 px-3`}>
                            {mode.name}
                        </div>
                    ))
                }
            </div>
            <div className="fixed z-20 bg-white h-36 shadow-sm w-full">
                <div className='laptop:flex items-center justify-center py-8 hidden'>
                    <div className=''>
                        <div className='flex space-x-6'>
                            {
                                filterModes.map((mode, index) => (
                                    <button
                                        key={index}
                                        onClick={() => filterOrders(mode)}
                                        className={`font-poppins-semibold rounded-md ${mode.tag == filterMode.tag ? "bg-black text-white" : "laptop:hover:bg-gray-100"} px-4 py-1 transition-colors duration-200 flex items-center justify-center`}>
                                        {mode.name}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='laptop:hidden flex justify-between px-4 mb-4 mt-8'>
                    <p className='text-lg '>
                        Pedidos: <span className='font-poppins-semibold'>{filterMode.name}</span>
                    </p>
                    <HamburgerMenuIcon width="25px" height='25px'
                                       onClick={toggleHamburgerMenu}/>
                </div>
                <div className='flex items-center px-4 pb-4 space-x-6'>
                    <div
                        className=''>
                        {
                            ascendingSorting ?
                                <div className='flex space-x-3 items-center'>
                                    <div
                                        className='cursor-pointer laptop:hover:bg-gray-100 transition durantion-200 w-fit p-1 rounded-md'
                                        onClick={toggleSortingOrder}>
                                        <SortAscending
                                            width={"20px"}
                                            height={"20px"}/>

                                    </div>
                                    <p className='text-gray-600 text-sm font-poppins-semibold prevent-select'>Antigo {"→"} Recente</p>
                                </div>

                                :
                                <div className='flex space-x-3 items-center'>
                                    <div
                                        className='cursor-pointer laptop:hover:bg-gray-100 transition durantion-200 w-fit p-1 rounded-md'
                                        onClick={toggleSortingOrder}>
                                        <SortDescending
                                            width={"20px"}
                                            height={"20px"}/>

                                    </div>
                                    <p className='text-gray-600 text-sm font-poppins-semibold prevent-select'> Recente {"→"} Antigo</p>
                                </div>
                        }
                    </div>
                    <div className='flex items-center space-x-4'>
                        <div className="relative inline-block text-left">
                            <button
                                onClick={toggleDropdown}
                                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium bg-white rounded-md hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100"
                            >
                                Mesa
                                <svg
                                    className="-mr-1 ml-2 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.71-3.73a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            {isTableSelectMenuOpen && (
                                <div
                                    className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1" role="menu" aria-orientation="vertical"
                                         aria-labelledby="options-menu">
                                        {
                                            allTablesNumbers.map((x, index) =>
                                                <button
                                                    onClick={() =>
                                                        selectTable(x)
                                                    }
                                                    key={index}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem">
                                                    {
                                                        x == "Todas" ? x : `Mesa ${x}`
                                                    }
                                                </button>
                                            )
                                        }

                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='italic text-sm text-gray-500 font-poppins-semibold prevent-select'>
                            <p>
                                {
                                    tableSelection == "Todas" ? tableSelection : `Mesa ${tableSelection}`
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${orderSelected != null && 'laptop:flex laptop:h-screen'} `}>
                <div
                    className={`pt-40 space-y-3 transition-all ease-in-out duration-700 ${orderSelected ? 'laptop:w-1/2' : 'laptop:w-full'}`}>
                    {filteredOrders.map((order, index) => (
                        <OrderListingItem
                            order={order}
                            key={index}
                            onClick={() => setOrderSelected(order)}/>
                    ))}
                </div>
                <div
                    className={`fixed bg-white laptop:pt-36 h-dvh w-full laptop:w-1/2 top-0 laptop:right-0 laptop:bottom-1 ease-in-out duration-500 ${orderSelected != null ? ' translate-y-0 laptop:translate-x-0' : 'translate-y-[110%] laptop:translate-y-0 laptop:translate-x-full'} shadow-md z-30 laptop:z-10`}>
                    <div className='flex justify-end p-4'>
                        <button className='rounded-md p-0.5 laptop:hover:bg-gray-100 transition duration-200'
                                onClick={() => setOrderSelected(null)}>
                            <CharmCross width="20px" height="20px"/>
                        </button>
                    </div>
                    <div className='flex justify-between items-center border-b border-gray-200 px-4 pb-4'>
                        <div className='w-full'>
                            <div className='flex flex-col-reverse laptop:flex-row laptop:justify-between'>
                                <h1 className='text-2xl w-[80%] leading-tight text-gray-700'>
                                    {orderSelected != null ?
                                        orderSelected.orderedItemName :
                                        "name"
                                    }
                                </h1>
                                <div className='prevent-select w-fit mb-2 laptop:mb-0'>
                                    {
                                        orderSelected ?
                                            orderSelected.prepStatus == "Done" ?
                                                <div className=''>
                                                    <p className='font-poppins-medium bg-green-200 rounded-full text-xs px-2.5 py-0.5'>
                                                        Pronto
                                                    </p>
                                                </div> :
                                                orderSelected.prepStatus == "In Progress" ?
                                                    <div className=''>
                                                        <p className='font-poppins-medium bg-yellow-300 rounded-full text-xs px-2.5 py-0.5'>
                                                            Em Preparo
                                                        </p>
                                                    </div> :
                                                    orderSelected.prepStatus == "New" ?
                                                        <div className=''>
                                                            <p className='font-poppins-medium bg-blue-200 rounded-full text-xs px-2.5 py-0.5'>
                                                                Novo
                                                            </p>
                                                        </div> :
                                                        <div className=''>
                                                            <p className='font-poppins-medium bg-red-200 rounded-full text-xs px-2.5 py-0.5'>
                                                                Cancelado
                                                            </p>
                                                        </div> :
                                            <div>

                                            </div>
                                    }
                                </div>
                            </div>
                            <div
                                className='mt-6 laptop:flex laptop:space-x-3 laptop:space-y-0 space-y-2'>
                                <div className='flex space-x-3'>
                                    <h2 className='flex items-center rounded-md border border-gray-300 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold prevent-select'>
                                        <PriceTag className='mr-1'/>
                                        {
                                            orderSelected != null ?
                                                orderSelected.total :
                                                "0.00"
                                        }
                                    </h2>
                                    <h2 className='flex items-center rounded-md border border-gray-300 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold prevent-select'>
                                        <CutleryIcon className='mr-1'/>
                                        {orderSelected != null ?
                                            `${orderSelected.quantity} 
                                        ${orderSelected.quantity == 1 ? "unidade" : "unidades"}` :
                                            "0 itens"
                                        }&nbsp;
                                    </h2>
                                </div>
                                <div className='flex space-x-3'>
                                    <h2 className='flex items-center rounded-md border border-gray-300 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold prevent-select'>
                                        <QrCode className='mr-1'/>
                                        Mesa {orderSelected ? orderSelected.tableNumber :
                                        "null"}
                                    </h2>
                                    <h2 className='flex items-center rounded-md border border-gray-300 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold prevent-select'>
                                        <ClockIcon className='mr-1'/>
                                        {orderSelected ? timeCalculator(orderSelected.orderTime) : "now"}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='p-4 relative laptop:static h-full'>

                        {
                            orderSelected != null &&
                            <div className='flex space-x-2'>
                                {
                                    ["New", "In Progress"].includes(orderSelected?.prepStatus) &&
                                    <button
                                        onClick={() => updateStatus(orderSelected?.prepStatus == "New" ?
                                            "in-progress" :
                                            orderSelected?.prepStatus == "In Progress" ?
                                                "done" : "done")}
                                        className='bg-black text-white font-poppins-semibold w-fit px-8 py-1.5 rounded-lg'>
                                        {
                                            orderSelected?.prepStatus == "New" ?
                                                "Em preparo" :
                                                orderSelected?.prepStatus == "In Progress" &&
                                                "Pronto"
                                        }
                                    </button>
                                }

                                {orderSelected?.prepStatus != "Cancelled" &&
                                    <button
                                        onClick={() => {
                                            updateStatus("cancel")
                                        }}
                                        className='bg-red-500 hover:bg-red-600 text-white font-poppins-semibold w-fit px-8 py-1.5 rounded-lg'>
                                        Cancelar
                                    </button>
                                }
                            </div>
                        }
                        <div className=''>
                            {orderSelected &&
                                orderSelected.additionalNote != undefined &&
                                <div>
                                    <h1 className='text-lg font-poppins-semibold'>
                                        Detalhes do cliente:
                                    </h1>
                                    <p className='italic text-gray-700 my-2'>
                                        "{orderSelected?.additionalNote}"
                                    </p>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`z-40 transition-all fixed duration-300 ${isLeftMenuOpen ? "opacity-[30%]" : "opacity-[0%] hidden"} bg-black  w-full h-dvh top-0 left-0`}
                onClick={toggleHamburgerMenu}>
            </div>

        </div>
    );
}

export default OrdersInterface;