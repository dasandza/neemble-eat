import {useEffect, useState} from "react";
import {AirtableOrders} from "../interfaces.tsx";
import fetchAirtableRecords from "../utils/fetcher.ts";
import KitchenOrderListingItem from "../Components/KitchenOrderListingItem.tsx";
import filterLastXhOrders from "../utils/filterLastXhOrders.ts";

import {
    CharmCross, ClockIcon,
    CutleryIcon,
    HamburgerMenuIcon,
    PriceTag,
    QrCode,
    SortAscending,
    SortDescending
} from "../assets/icons";
import timeCalculator from "../utils/TimeCalculator.ts";
import updateFieldsInAirtable from "../utils/updateFieldsInAirtable.ts";


interface filterProps {
    name: string,
    tag: string,
}


function KitchenOrdersInterface() {
    const [orders, setOrders] = useState<AirtableOrders[]>([])
    const [error, setError] = useState<string>("")
    const [orderSelected, setOrderSelected] = useState<AirtableOrders | null>(null)
    const [filteredOrders, setFilteredOrders] = useState<AirtableOrders[]>(orders)
    const [filterMode, setFilterMode] = useState<filterProps>({name: "Todos", tag: "All"})
    const [ascendingSorting, setAscendingSorting] = useState<boolean>(false)
    //const [groupByTable, setGroupByTable] = useState<boolean>()
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState<boolean>(false)

    const filterModes: filterProps[] = [
        {name: "Todos", tag: "All"},
        {name: "Novos", tag: "New"},
        {name: "Em Preparo", tag: "In progress"},
        {name: "Prontos", tag: "Done"},
        {name: "Cancelados", tag: "Cancelled"},
    ]

    useEffect(() => {
        async function fetchData() {
            try {
                const ordersData = await fetchAirtableRecords("Orders");
                const o1 = ordersData.filter((order: AirtableOrders) => filterLastXhOrders(order) && order.fields["Session Status"][0] != "Billed")
                const o2 = sortOrdersByDate(o1, ascendingSorting)
                if (filterMode.tag != "All") {
                    setOrders(o2.filter(order => order.fields["Order Status"] == filterMode.tag))
                    setFilteredOrders(o2.filter(order => order.fields["Order Status"] == filterMode.tag))
                } else {
                    setOrders(o2)
                    setFilteredOrders(o2)
                }
            } catch (err) {
                setError(`Failed to fetch data: ${err}`);
                console.error("Error fetching data:", err);
            }
        }

        fetchData().then(r => r);

    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const ordersData = await fetchAirtableRecords("Orders");
                const o1 = ordersData.filter((order: AirtableOrders) => filterLastXhOrders(order) && order.fields["Session Status"][0] != "Billed")
                const o2 = sortOrdersByDate(o1, ascendingSorting)
                if (filterMode.tag != "All") {
                    setOrders(o2.filter(order => order.fields["Order Status"] == filterMode.tag))
                    setFilteredOrders(o2.filter(order => order.fields["Order Status"] == filterMode.tag))
                } else {
                    setOrders(o2)
                    setFilteredOrders(o2)
                }
            } catch (err) {
                setError(`Failed to fetch data: ${err}`);
                console.error("Error fetching data:", err);
            }
        }

        fetchData().then(r => r);

    }, [filterMode]);

    useEffect(() => {
        async function fetchData() {
            try {
                const ordersData = await fetchAirtableRecords("Orders");
                const o1 = ordersData.filter((order: AirtableOrders) => filterLastXhOrders(order) && order.fields["Session Status"][0] != "Billed")
                const o2 = sortOrdersByDate(o1, ascendingSorting)
                if (filterMode.tag != "All") {
                    setOrders(o2.filter(order => order.fields["Order Status"] == filterMode.tag))
                    setFilteredOrders(o2.filter(order => order.fields["Order Status"] == filterMode.tag))
                } else {
                    setOrders(o2)
                    setFilteredOrders(o2)
                }

            } catch (err) {
                setError(`Failed to fetch data: ${err}`);
                console.error("Error fetching data:", err);
            }
        }

        fetchData().then(r => r);

    }, [orderSelected]);


    function filterOrders(mode: filterProps) {
        setFilterMode(mode)
        if (mode.tag != "All") {
            setFilteredOrders(orders.filter(order => order.fields["Order Status"] == mode.tag))
        } else {
            setFilteredOrders(orders)
        }
    }

    function sortOrdersByDate(orders: AirtableOrders[], ascending: boolean = true): AirtableOrders[] {
        return orders.sort((a, b) => {
            const dateA = new Date(a.createdTime);
            const dateB = new Date(b.createdTime);
            return ascending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        });
    }

    function toggleHamburgerMenu() {
        setIsLeftMenuOpen(!isLeftMenuOpen)
    }

    function upddateStatus(newStatus: string): void {
        for (const orderIndex in filteredOrders) {
            if (filteredOrders[orderIndex].id == orderSelected?.id) {
                const order = filteredOrders[orderIndex]
                const name = "Orders"
                const recordId = order.id
                const fieldsToUpdate = {"Order Status": newStatus}

                updateFieldsInAirtable({
                    tableName: name,
                    recordId: recordId,
                    fieldsToUpdate: fieldsToUpdate
                }).then(() => {
                })
                //alert(`Pedido alterado para ${newStatus}`);
                order.fields["Order Status"] = newStatus;
                setOrderSelected(order)
                setFilteredOrders(filteredOrders.map(x => x == order ? order : x))
            }
        }
    }

    function toggleSortingOrder() {
        setAscendingSorting(!ascendingSorting)
        setFilteredOrders(sortOrdersByDate(filteredOrders, !ascendingSorting))
    }

    if (error != "") return <div>{error}</div>

    if (orders == null) return <div>no order</div>

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
            <div className="fixed z-20 bg-white shadow-sm w-full">
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
                <div className='px-4 pb-4'>
                    <div
                        onClick={toggleSortingOrder}
                        className='cursor-pointer laptop:hover:bg-gray-100 transition durantion-200 w-fit py-1 px-2 rounded-md'>
                        {
                            ascendingSorting ?
                                <div className='flex text-gray-700 space-x-2 items-center'>
                                    <SortAscending
                                        width={"20px"}
                                        height={"20px"}/>

                                </div>
                                :
                                <div className='flex  text-gray-700 space-x-2 items-center'>
                                    <SortDescending
                                        width={"20px"}
                                        height={"20px"}/>

                                </div>

                        }
                    </div>

                </div>
            </div>
            <div className={`${orderSelected != null && 'laptop:flex laptop:h-screen'}`}>
                <div
                    className={`pt-40 space-y-3 transition-all ease-in-out duration-700 ${orderSelected ? 'laptop:w-1/2' : 'laptop:w-full'}`}>
                    {filteredOrders.map((order, index) => (
                        <KitchenOrderListingItem
                            order={order}
                            key={index}
                            onClick={() => setOrderSelected(order)}/>
                    ))}
                </div>
                <div
                    className={`fixed laptop:pt-36 bg-white h-dvh laptop:h-screen w-full laptop:w-1/2 top-0 laptop:right-0 laptop:bottom-1 ease-in-out duration-700 ${orderSelected != null ? ' translate-y-0 laptop:translate-x-0' : 'translate-y-[110%] laptop:translate-y-0 laptop:translate-x-full'} shadow-md z-30 laptop:z-10`}>

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
                                        orderSelected.fields["Name (from Item)"] :
                                        "name"
                                    }
                                </h1>
                                <div className='prevent-select w-fit mb-2 laptop:mb-0'>
                                    {
                                        orderSelected ?
                                            orderSelected.fields["Order Status"] == "Done" ?
                                                <div className=''>
                                                    <p className='bg-green-200 rounded-full text-xs px-2.5 py-0.5'>
                                                        Pronto
                                                    </p>
                                                </div> :
                                                orderSelected.fields["Order Status"] == "In progress" ?
                                                    <div className=''>
                                                        <p className='bg-yellow-300 rounded-full text-xs px-2.5 py-0.5'>
                                                            Em Preparo
                                                        </p>
                                                    </div> :
                                                    orderSelected.fields["Order Status"] == "New" ?
                                                        <div className=''>
                                                            <p className='bg-blue-200 rounded-full text-xs px-2.5 py-0.5'>
                                                                Novo
                                                            </p>
                                                        </div> :
                                                        <div className=''>
                                                            <p className='bg-red-200 rounded-full text-xs px-2.5 py-0.5'>
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
                                                orderSelected.fields["Total"] :
                                                "0.00"
                                        }
                                    </h2>
                                    <h2 className='flex items-center rounded-md border border-gray-300 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold prevent-select'>
                                        <CutleryIcon className='mr-1'/>
                                        {orderSelected != null ?
                                            `${orderSelected.fields.Quantity} 
                                        ${orderSelected.fields.Quantity == 1 ? "unidade" : "unidades"}` :
                                            "0 itens"
                                        }&nbsp;
                                    </h2>
                                </div>
                                <div className='flex space-x-3'>
                                    <h2 className='flex items-center rounded-md border border-gray-300 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold prevent-select'>
                                        <QrCode className='mr-1'/>
                                        Mesa {orderSelected ? orderSelected.fields["Table Number"] :
                                        "null"}
                                    </h2>
                                    <h2 className='flex items-center rounded-md border border-gray-300 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold prevent-select'>
                                        <ClockIcon className='mr-1'/>
                                        {orderSelected ? timeCalculator(orderSelected.fields["Time Created"]) : "now"}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='p-4 relative laptop:static h-full'>
                        <div className=''>
                            {orderSelected &&
                                orderSelected.fields["Aditional Note"] != undefined &&
                                <div>
                                    <h1 className='text-xl font-poppins-semibold'>
                                        Detalhes do cliente:
                                    </h1>
                                    <p className='italic text-gray-700 my-2'>
                                        "{orderSelected?.fields["Aditional Note"]}"
                                    </p>
                                </div>
                            }
                        </div>
                        {orderSelected != null &&
                            <div
                                className='flex flex-col space-x-3 laptop:space-x-0 laptop:space-y-3'>
                                {

                                    ["New", "In progress"].includes(orderSelected?.fields["Order Status"]) &&
                                    <button
                                        onClick={() => upddateStatus(orderSelected?.fields["Order Status"] == "New" ?
                                            "In progress" :
                                            orderSelected?.fields["Order Status"] == "In progress" ?
                                                "Done" : "Done")}
                                        className='bg-black text-white font-poppins-semibold w-[75%] laptop:w-fit laptop:px-8 py-1.5 rounded-lg'>
                                        {
                                            orderSelected?.fields["Order Status"] == "New" ?
                                                "Em preparo" :
                                                orderSelected?.fields["Order Status"] == "In progress" &&
                                                "Pronto"
                                        }
                                    </button>
                                }

                                {orderSelected?.fields["Order Status"] != "Cancelled" &&
                                    <button
                                        onClick={() => {
                                            upddateStatus("Cancelled")
                                        }}
                                        className='bg-red-500 hover:bg-red-600 text-white font-poppins-semibold w-[25%] laptop:w-fit laptop:px-8 py-1.5 rounded-lg'>
                                        Cancelar
                                    </button>
                                }

                            </div>
                        }
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

export default KitchenOrdersInterface;