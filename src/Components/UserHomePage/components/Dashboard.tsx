import {DashboardTable} from "../index.ts";
import formatDateString from "../../../utils/DateFormat.tsx";
import {useEffect, useState} from "react";
import {fetchTopOrders} from "../../../api";
import {useUserPageContext} from "../../../context/userPageContext.ts";


function Dashboard() {

    const {restaurant, representant} = useUserPageContext()

    const origin = window.location.origin

    const time = formatDateString(new Date(new Date().getTime()).toString())
    const [salesData, setSalesData] = useState<[string, number][]>([])

    useEffect(() => {
        async function fetch() {
            const topOrdersStored = sessionStorage.getItem("TopOrders")
            let topOrders: [string, number][] | null = topOrdersStored ? JSON.parse(topOrdersStored) : null
            if (topOrdersStored == null)
                topOrders = await fetchTopOrders({restaurantID: restaurant.id})

            if (topOrders) {
                sessionStorage.setItem("TopOders", JSON.stringify(topOrders))
                setSalesData(topOrders)
            }
        }

        fetch().then()
    }, []);

    return (
        <div className={`py-4 laptop:px-4`}>
            <div
                className='font-poppins-semibold text-lg mt-4 px-2 text-gray-600 mx-2 pb-6 laptop:flex justify-between border-b-2 border-gray-200'>
                <div className={`mr-4 w-fit`}>
                    <h1 className={`font-poppins-medium text-3xl my-1 text-black`}>
                        Olá, {representant.firstName}!
                    </h1>
                    <p className={`text-gray-500 text-sm`}>
                        Acompanhe por aqui o progresso do seu restaurante.
                    </p>
                </div>
                <div className={`laptop:text-right`}>
                    <h2 className={`text-sm`}>
                        {time}
                    </h2>
                </div>
            </div>
            <div className={`px-4 mt-6 space-y-6`}>
                <section>
                    <h1 className='font-poppins-medium text-gray-600 pb-2 ml-2'>
                        Gestão
                    </h1>

                    <div
                        className={`space-y-6 laptop:flex laptop:space-x-6 laptop:space-y-0 p-1.5 rounded-3xl`}>
                        <div
                            className='font-poppins-medium bg-white p-4 rounded-3xl shadow-sm w-full laptop:w-1/2 border border-gray-200'>
                            <div className={`flex flex-col justify-between h-full`}>
                                <div>
                                    <div
                                        className={`flex relative space-x-3.5 items-center w-fit rounded-xl bg-blue-50 px-3.5 py-0.5 text-blue-400 prevent-select text-sm`}>
                                        <div className={`h-1.5 w-1.5 rounded-full bg-blue-400 absolute`}/>
                                        <h1 className={`w-full`}>
                                            Os seus pedidos
                                        </h1>
                                    </div>
                                    <p className={`text-gray-600 text-sm mt-3 pb-3 w-[90%]`}>
                                        Veja os pedidos feitos pelos seus clientes.
                                        Clique no botão abaixo para acessar a sua tela de gerenciamento.
                                    </p>
                                </div>
                                <a href={`${origin}/neemble-eat/orders/${restaurant.id}`}
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    <button
                                        className={`bg-black text-white rounded-lg px-6 py-0.5 mt-4 text-center transition duration-150 hover:bg-gray-600`}>
                                        Abrir
                                    </button>
                                </a>
                            </div>
                        </div>
                        <div
                            className='font-poppins-medium bg-white p-4 rounded-3xl shadow-sm w-full laptop:w-1/2 border border-gray-200'>
                            <div className={`flex flex-col justify-between h-full`}>
                                <div>
                                    <div
                                        className={`relative space-x-3.5 flex items-center w-fit rounded-xl bg-indigo-100 px-3 py-0.5 text-indigo-400 text-sm`}>
                                        <div className={`h-1.5 w-1.5 rounded-full bg-indigo-400 absolute`}/>
                                        <h1 className={`w-full prevent-select`}>
                                            Mesas do restaurante
                                        </h1>
                                    </div>
                                    <p className={`text-gray-600 text-sm mt-3 pb-6 w-[90%]`}>
                                        Acompanhe em tempo real a atividade em cada mesa do seu restaurante.
                                        Clique no botão abaixo para acessar a sua tela de gerenciamento.
                                    </p>
                                </div>
                                <a href={`${origin}/neemble-eat/sessions/${restaurant.id}`}
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    <button
                                        className={`bg-black text-white rounded-lg px-6 py-0.5 mt-4 text-center transition duration-150 hover:bg-gray-600`}>
                                        Abrir
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={`hidden`}>
                    <h1 className='font-poppins-medium text-gray-600 pb-2 ml-2'>
                        Performance
                    </h1>
                    <div
                        className='space-y-4 laptop:space-y-0 laptop:flex laptop:space-x-6 h-fit rounded-3xl p-1.5'>

                        <div className={`laptop:w-1/2 space-y-3`}>
                            <div className=''>
                                <div className={`flex space-x-3`}>
                                    <div
                                        className='space-y-4 bg-white border border-gray-200 rounded-3xl p-4 w-1/2 shadow-sm'>
                                        <div>
                                            <h2 className='text-sm text-gray-400 font-poppins-semibold'>
                                                Usuários em Agosto
                                            </h2>
                                            <p className='text-2xl my-4 font-poppins-semibold'>
                                                1056
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className='space-y-4 bg-white border border-gray-200 rounded-3xl p-4 w-1/2 shadow-sm'>
                                        <div>
                                            <h2 className='text-sm text-gray-400 font-poppins-semibold'>
                                                Usuários ativos
                                            </h2>
                                            <div className={`flex items-baseline`}>
                                                <p className='text-2xl my-4 font-poppins-semibold'>
                                                    13
                                                </p>
                                                <p className={`h-fit text-[9px] font-poppins-semibold rounded-full bg-green-200 text-green-700 px-2 mx-2`}>
                                                    +15%
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <div className={`flex space-x-4`}>
                                    <div
                                        className='space-y-4 rounded-3xl bg-white border border-gray-200 p-4 w-1/2 shadow-sm'>
                                        <div>
                                            <h2 className='text-sm text-gray-400 font-poppins-semibold'>
                                                Usuários em Agosto
                                            </h2>
                                            <p className='text-2xl my-4 font-poppins-semibold'>
                                                1056
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className='space-y-4 rounded-3xl bg-white border border-gray-200 p-4 w-1/2 shadow-sm'>
                                        <div>
                                            <h2 className='text-sm text-gray-400 font-poppins-semibold'>
                                                Usuários ativos
                                            </h2>
                                            <div className={`flex items-baseline`}>
                                                <p className='text-2xl my-4 font-poppins-semibold'>
                                                    13
                                                </p>
                                                <p className={`h-fit text-[9px] font-poppins-semibold rounded-full bg-green-200 text-green-700 px-2 mx-2`}>
                                                    +15%
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <section>
                    <h1 className='font-poppins-medium text-gray-600 pb-2 ml-2'>
                        Tendências
                    </h1>
                    <div className={`w-full laptop:w-1/2`}>
                        <h2 className={`text-sm text-gray-400 italic ml-2 my-2 font-poppins-semibold`}>
                            - Pratos mais pedidos nos últimos 7 dias
                        </h2>
                        <div className={`p-1.5`}>
                            <DashboardTable data={salesData}/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;