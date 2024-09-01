import {DashboardTable} from "../index.ts";
import {RepresentantJson, RestaurantJson} from "../../../schema.ts";
import formatDateString from "../../../utils/DateFormat.tsx";


interface data {
    item: string
    price: number
    amount: number
}


interface props {
    restaurant: RestaurantJson
    representant: RepresentantJson
}


function Dashboard({representant, restaurant}: props) {

    const time = formatDateString(new Date(new Date().getTime()).toString())

    const data: data[] = [
        {item: 'Apple', price: 2000, amount: 10},
        {item: 'Banana', price: 5000, amount: 9},
        {item: 'Orange', price: 3500, amount: 8},
        {item: 'Orange', price: 3500, amount: 7},
        {item: 'Orange', price: 3500, amount: 6},
        {item: 'Orange', price: 3500, amount: 5},
    ];


    return (
        <div>
            <div
                className='font-poppins-semibold text-lg my-4 px-2 text-gray-600 border-b-[1.5px] border-gray-100 mx-2 pb-4 laptop:pb-8 laptop:flex justify-between'>
                <div className={`mr-4 w-fit`}>
                    <h1 className={`font-poppins-medium text-3xl my-1`}>
                        Olá, {representant.firstName}!
                    </h1>
                    <p className={`text-gray-500 text-base laptop:text-sm`}>
                        Acompanhe por aqui o progresso do seu restaurante.
                    </p>
                </div>
                <div className={`laptop:text-right`}>
                    <h2 className={`text-sm`}>
                        {time}
                    </h2>
                </div>
            </div>
            <div>
                <div className={`px-4`}>
                    <div className={`rounded-xl border-dashed border-2 border-gray-300 p-3`}>
                        <h1 className=' mx-4 font-poppins-medium py-2'>
                            Controle:
                        </h1>
                        <div className={`space-y-6 laptop:flex laptop:space-x-8 laptop:space-y-0`}>
                            <div className='font-poppins-medium bg-gray-100 p-4 rounded-md w-full laptop:w-1/2 shadow'>
                                <div className={`flex flex-col justify-between h-full`}>
                                    <div>
                                        <div
                                            className={`flex items-center w-fit rounded-md bg-blue-50 px-2 py-0.5 text-blue-500 text-sm border border-blue-200`}>
                                            <h1 className={`mr-2`}>
                                                Os seus pedidos
                                            </h1>
                                        </div>
                                        <p className={`text-gray-700 text-sm my-3 w-[90%]`}>
                                            Veja os pedidos feitos pelos seus clientes.
                                            Clique no botão abaixo para acessar a sua tela de gerenciamento.
                                        </p>
                                    </div>
                                    <a href={`https://https://dasandza.github.io/neemble-eat/orders/${restaurant.id}`}
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        <button
                                            className={`bg-black text-white rounded-md px-6 py-0.5 mt-4 text-center hover:ring-1 hover:ring-gray-300`}>
                                            Abrir
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div className='font-poppins-medium bg-gray-100 p-4 rounded-md w-full laptop:w-1/2 shadow'>
                                <div className={`flex flex-col justify-between h-full`}>
                                    <div>
                                        <div
                                            className={`flex items-center w-fit rounded-md bg-indigo-100 px-2 py-0.5 text-indigo-600 text-sm border border-indigo-200`}>
                                            <h1 className={`mr-2`}>
                                                Mesas do restaurante
                                            </h1>
                                        </div>
                                        <p className={`text-gray-700 text-sm my-3 w-[90%]`}>
                                            Acompanhe em tempo real a atividade em cada mesa do seu restaurante.
                                            Clique no botão abaixo para acessar a sua tela de gerenciamento.
                                        </p>
                                    </div>
                                    <a href={`https://https://dasandza.github.io/neemble-eat/sessions/${restaurant.id}`}
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        <button
                                            className={`bg-black text-white rounded-md px-6 py-0.5 mt-4 text-center hover:ring-1 hover:ring-gray-300`}>
                                            Abrir
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='space-y-4 laptop:space-y-0 laptop:flex laptop:space-x-4 h-fit mt-4'>
                    <div className={`laptop:w-1/2 px-4 space-y-2 hidden `}>
                        <div className=''>
                            <h1 className='text-lg font-poppins-semibold my-4'>
                                Usuários
                            </h1>
                            <div className={`flex space-x-4 rounded-xl bg-stone-100 p-3`}>
                                <div className='space-y-4 bg-white rounded-xl p-4 w-1/2'>
                                    <div>
                                        <h2 className='text-sm text-gray-400 font-poppins-semibold'>
                                            Usuários em Agosto
                                        </h2>
                                        <p className='text-2xl my-4 font-poppins-semibold'>
                                            1056
                                        </p>
                                    </div>
                                </div>
                                <div className='space-y-4 bg-white rounded-xl p-4 w-1/2'>
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
                            <h1 className='text-lg text-gray-600'>
                                Usuários
                            </h1>
                            <div className={`flex space-x-4`}>
                                <div className='space-y-4 my-3 rounded-xl bg-white p-4 w-1/2'>
                                    <div>
                                        <h2 className='text-sm text-gray-400 font-poppins-semibold'>
                                            Usuários em Agosto
                                        </h2>
                                        <p className='text-2xl my-4 font-poppins-semibold'>
                                            1056
                                        </p>
                                    </div>
                                </div>
                                <div className='space-y-4 my-3 rounded-xl bg-white p-4 w-1/2'>
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
                    <div className={`w-full laptop:w-1/2 px-4`}>
                        <h1 className='text-lg font-poppins-medium my-4 w-[70%]'>
                            Mais consumidos nos últimos 7 dias
                        </h1>
                        <div className={`pb-8 laptop:pb-0`}>
                            <DashboardTable data={data}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;