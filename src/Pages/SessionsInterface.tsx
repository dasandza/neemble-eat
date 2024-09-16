import {useEffect, useState} from "react";
import SessionListingItem from "../Components/SessionListingItem.tsx";

import {
    CharmCross, ClockIcon,
    CutleryIcon,
    HamburgerMenuIcon,
    PriceTag, PrintIcon,
    QrCode,
} from "../assets/icons";
import timeCalculator from "../utils/TimeCalculator.ts";
import filterLastXhSessions from "../utils/filterLastXhSessions.ts";
import exportDataToCSV from "../utils/ExportToCSV.ts";
import {OrderJson, SessionStatus, TableSessionJson} from "../schema.ts";
import fetchLastSessions from "../api/functions/fetchLastSessions.ts";
import {useParams} from "react-router-dom";
import {closeSession} from "../api";
import {apiUrl} from "../api/functions/key.ts";


interface filterProps {
    name: string,
    tag: string,
}


function SessionsInterface() {

    document.title = "Gestão de Mesas"

    const BASE_URL = apiUrl

    const {restaurantID} = useParams() as unknown as { restaurantID: string }
    const [sessions, setSessions] = useState<TableSessionJson[]>([])
    const [error, setError] = useState<string>("")
    const [sessionSelected, setSessionSelected] = useState<TableSessionJson | null>(null)
    const [filteredSessions, setFilteredSessions] = useState<TableSessionJson[]>(sessions)
    const [filterMode, setFilterMode] = useState<filterProps>({name: "Todos", tag: "All"})
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState<boolean>(false)
    const [isTableSelectMenuOpen, setIsTableSelectMenuOpen] = useState(false);
    const [allTablesNumbers, setAllTablesNumbers] = useState<string[]>(["Todas"])
    const [tableSelection, setTableSelection] = useState("Todas")

    const filterModes: filterProps[] = [
        {name: "Todos", tag: "All"},
        {name: "Faturas", tag: "Billed"},
        {name: "Mesas Ocupadas", tag: "Open"},
        {name: "Mesas Livres", tag: "Free"},
    ]

    useEffect(() => {
        async function fetchData() {
            try {
                const sessionsData = await fetchLastSessions({restaurantID: restaurantID})
                const s = sessionsData.filter((session) => filterLastXhSessions(session))
                console.log(s)
                setSessions(s)
                setFilteredSessions(s)


                // Tables
                const temp = allTablesNumbers
                for (const session of s) {
                    if (!temp.includes(session.tableNumber.toString())) {
                        temp.push(session.tableNumber.toString())
                    }
                }
                setAllTablesNumbers(temp)
            } catch (err) {
                setError(`Failed to fetch data: ${err}`);
                console.error("Error fetching data:", err);
            }
        }

        fetchData().then(r => r);

    }, []);


    useEffect(() => {
        let ws: WebSocket;

        const connectWebSocket = () => {
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

            const reconnect = () => {
                console.log("Reconnecting WebSocket...")
                setTimeout(connectWebSocket, 1000)
            }

            try {
                ws = new WebSocket(`${protocol}//${BASE_URL}/ws/${restaurantID}/closed_session`);
            } catch (error) {
                console.log("Could not open the websocket: ", error)
            }

            ws.onopen = () => {
                console.log('WebSocket Connected');
            }

            ws.onmessage = (event) => {
                try {
                    const newSession: TableSessionJson = JSON.parse(event.data)
                    const tableNumber = newSession.tableNumber
                    setSessions(sessions.map((session) => {
                        if (session.tableNumber == tableNumber) {
                            if (session.status == "Open") {
                                session.status = "Billed" as SessionStatus
                            } else {
                                return newSession
                            }
                        }
                        return session
                    }))
                } catch (error) {
                    console.error(error)
                }
            }

            ws.onclose = (event) => {
                console.log("Closed Session Websocket Disconnected");
                if (!event.wasClean) {
                    reconnect()
                }
            }

            ws.onerror = (error) => {
                console.error("Could not open the websocket: ", error)
                reconnect()
            }
        }

        setTimeout(connectWebSocket, 1000);

    }, []);


    useEffect(() => {
        let ws: WebSocket;

        const connectWebSocket = () => {
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

            const reconnect = () => {
                console.log("Reconnecting WebSocket...")
                setTimeout(connectWebSocket, 1000)
            }

            try {
                ws = new WebSocket(`${protocol}//${BASE_URL}/ws/${restaurantID}/session_order`);
            } catch (error) {
                console.log("Could not open the websocket: ", error)
            }

            ws.onopen = () => {
                console.log('WebSocket Connected');
            }

            ws.onmessage = (event) => {
                try {
                    const order: OrderJson = JSON.parse(event.data)
                    console.log("New Order: ", order)
                    const sessionID = order.sessionID
                    setSessions(sessions.map((session) => {
                        if (session.id == sessionID) {
                            const aux = session
                            aux.total += order.total
                            aux.orders = [...session.orders, order.id]
                            return aux
                        }
                        return session
                    }))
                } catch (error) {
                    console.error(error)
                }
            }

            ws.onclose = (event) => {
                console.log("New Order Websocket Disconnected");
                if (!event.wasClean) {
                    reconnect()
                }
            }

            ws.onerror = (error) => {
                console.error("Could not open the websocket: ", error)
                reconnect()
            }
        }

        setTimeout(connectWebSocket, 1000);

    }, []);

    function filterSessions(mode: filterProps) {
        setFilterMode(mode)
        if (mode.tag != "All") {
            if (mode.tag == "Free") {
                setFilteredSessions(sessions.filter((session) => {
                    if (!session.orders) {
                        return true
                    }
                    return session.orders.length == 0
                }))
            } else {
                setFilteredSessions(sessions.filter(session => session.status == mode.tag && (session.orders && session.orders.length != 0)))
            }
        } else {
            setFilteredSessions(sessions)
        }
    }

    function toggleHamburgerMenu() {
        setIsLeftMenuOpen(!isLeftMenuOpen)
    }

    function updateStatus(status: SessionStatus): void {
        if (sessionSelected) {
            sessionSelected.status = status
            setSessions(sessions.map((session) => sessionSelected.id == session.id ? sessionSelected : session))
            closeSession({sessionID: sessionSelected?.id, status: status})
        }
    }


    const toggleDropdown = () => {
        setIsTableSelectMenuOpen(!isTableSelectMenuOpen);
    };

    function selectTable(table: string) {
        setTableSelection(table)
        toggleDropdown()
        if (table == "Todas") {
            setFilteredSessions(sessions)
        } else {
            setFilteredSessions(sessions.filter(session => session.tableNumber == Number(table)))
        }
    }

    function getDayLog() {
        exportDataToCSV([])
    }

    if (error != "") return <div>{error}</div>

    if (sessions == null) return <div>no sessions</div>

    return (
        <div>
            <div
                className={`laptop:hidden py-16 divide-y divide-gray-100 fixed z-50 bg-white transition-all ease-in-out duration-300 ${!isLeftMenuOpen ? "-translate-x-full" : "translate-x-0"} h-dvh w-[60%] top-0 left-0`}>
                {
                    filterModes.map((mode, index) => (
                        <div key={index}
                             onClick={() => {
                                 filterSessions(mode);
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
                                        onClick={() => filterSessions(mode)}
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
                <div className='flex items-center px-4 pb-4 space-x-6 justify-between'>
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
                    <div className='px-4'>
                        <div
                            className='cursor-pointer laptop:hover:bg-gray-100 transition durantion-200 w-fit p-1 rounded-md'
                            onClick={() => getDayLog()}>
                            <PrintIcon
                                width={"20px"}
                                height={"20px"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${sessionSelected != null && 'laptop:flex laptop:h-screen'}`}>
                <div
                    className={`pt-40 space-y-3 transition-all ease-in-out duration-700 ${sessionSelected ? 'laptop:w-1/2' : 'laptop:w-full'}`}>
                    {filteredSessions.map((session, index) => (
                        <SessionListingItem
                            session={session}
                            key={index}
                            onClick={() => setSessionSelected(session)}/>
                    ))}
                </div>
                <div
                    className={`fixed laptop:pt-36 bg-white h-dvh laptop:h-screen w-full laptop:w-1/2 top-0 laptop:right-0 laptop:bottom-1 ease-in-out duration-700 ${sessionSelected != null ? ' translate-y-0 laptop:translate-x-0' : 'translate-y-[110%] laptop:translate-y-0 laptop:translate-x-full'} shadow-md z-30 laptop:z-10`}>

                    <div className='flex justify-end p-4'>
                        <button className='rounded-md p-0.5 laptop:hover:bg-gray-100 transition duration-200'
                                onClick={() => setSessionSelected(null)}>
                            <CharmCross width="20px" height="20px"/>
                        </button>
                    </div>
                    <div className='flex justify-between items-center border-b border-gray-200 px-4 pb-4'>
                        <div className='w-full'>
                            <div className='flex flex-col-reverse laptop:flex-row laptop:justify-between'>
                                <h1 className='text-2xl w-[80%] leading-tight text-gray-700'>
                                    Mesa {sessionSelected?.tableNumber}
                                </h1>
                                <div className='prevent-select w-fit mb-2 laptop:mb-0'>
                                    {
                                        sessionSelected &&
                                        sessionSelected.status == "Billed" ?
                                            <div className=''>
                                                <p className='bg-green-200 rounded-full text-xs px-2.5 py-0.5'>
                                                    Fatura
                                                </p>
                                            </div> :
                                            <div className=''>
                                                {
                                                    sessionSelected?.orders ?
                                                        sessionSelected?.orders.length == 0 ?
                                                            <p className='bg-yellow-300 rounded-full text-xs px-2.5 py-0.5'>
                                                                Sem Pedidos
                                                            </p> :
                                                            <p className='bg-yellow-300 rounded-full text-xs px-2.5 py-0.5'>
                                                                Em consumo
                                                            </p> :
                                                        <p className='bg-yellow-300 rounded-full text-xs px-2.5 py-0.5'>
                                                            Sem Pedidos
                                                        </p>
                                                }

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
                                            sessionSelected != null ?
                                                `${sessionSelected.total}   Kz` :
                                                "0Kz"
                                        }
                                    </h2>
                                    <h2 className='flex items-center rounded-md border border-gray-300 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold prevent-select'>
                                        <CutleryIcon className='mr-1'/>
                                        {
                                            sessionSelected != null ?
                                                sessionSelected.orders ?
                                                    `${sessionSelected.orders?.length} ${sessionSelected.orders && sessionSelected.orders.length == 1 ? "Pedido" : "Pedidos"}` :
                                                    "0 Pedidos" :
                                                "0 Pedidos"
                                        }&nbsp;
                                    </h2>
                                </div>
                                <div className='flex space-x-3'>
                                    <h2 className='flex items-center rounded-md border border-gray-300 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold prevent-select'>
                                        <QrCode className='mr-1'/>
                                        Mesa {sessionSelected ? sessionSelected.tableNumber :
                                        "null"}
                                    </h2>
                                    <h2 className='flex items-center rounded-md border border-gray-300 text-sm w-fit text-gray-500 px-1.5 font-poppins-semibold prevent-select'>
                                        <ClockIcon className='mr-1'/>
                                        {sessionSelected && sessionSelected.created_time ? timeCalculator(sessionSelected.created_time?.toString()) : "now"}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='p-4 relative laptop:static h-full'>
                        {
                            sessionSelected != null &&
                            <div className='flex space-x-2'>
                                {
                                    sessionSelected.status == "Open" &&
                                    <button onClick={() => updateStatus("Billed" as SessionStatus)}
                                            className='bg-black text-white font-poppins-semibold w-fit px-8 py-1.5 rounded-lg'>
                                        Fechar Conta
                                    </button>

                                }

                                {sessionSelected.status != "Cancelled" as SessionStatus &&
                                    <button
                                        onClick={() => {
                                            updateStatus("Cancelled" as SessionStatus)
                                        }}
                                        className='bg-red-500 hover:bg-red-600 text-white font-poppins-semibold w-fit px-8 py-1.5 rounded-lg'>
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

export default SessionsInterface;