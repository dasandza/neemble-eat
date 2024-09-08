import {DashboardTable} from "../index.ts";
import {RepresentantJson, RestaurantJson} from "../../../schema.ts";
import formatDateString from "../../../utils/DateFormat.tsx";


interface props {
    restaurant: RestaurantJson
    representant: RepresentantJson
}


function Dashboard({representant, restaurant}: props) {

    const time = formatDateString(new Date(new Date().getTime()).toString())

    return (
        <div className={`py-4 laptop:px-4`}>
            <div
                className='font-poppins-semibold text-lg mt-4 px-2 text-gray-600 mx-2 mb-4 laptop:flex justify-between'>
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
            <div className={`px-4 mt-8 space-y-6`}>

                <section>
                    <h1 className='font-poppins-medium text-gray-600 pb-2'>
                        Painel
                    </h1>

                    <div
                        className={`space-y-6 laptop:flex laptop:space-x-6 laptop:space-y-0 bg-gray-50 p-1.5 rounded-3xl`}>
                        <div
                            className='font-poppins-medium bg-white p-4 rounded-3xl shadow-sm w-full laptop:w-1/2 '>
                            <div className={`flex flex-col justify-between h-full`}>
                                <div>
                                    <div
                                        className={`flex items-center justify-center w-fit rounded-xl bg-blue-50 px-2 py-0.5 text-blue-400 prevent-select text-sm`}>
                                        <h1 className={`w-full`}>
                                            Os seus pedidos
                                        </h1>
                                    </div>
                                    <p className={`text-gray-700 text-sm mt-3 pb-3 w-[90%]`}>
                                        Veja os pedidos feitos pelos seus clientes.
                                        Clique no botão abaixo para acessar a sua tela de gerenciamento.
                                    </p>
                                </div>
                                <a href={`https://dasandza.github.io/neemble-eat/orders/${restaurant.id}`}
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    <button
                                        className={`bg-black text-white rounded-md px-6 py-0.5 mt-4 text-center transition duration-150 hover:bg-gray-600 hover:-translate-y-1`}>
                                        Abrir
                                    </button>
                                </a>
                            </div>
                        </div>
                        <div
                            className='font-poppins-medium bg-white p-4 rounded-3xl shadow-sm w-full laptop:w-1/2 '>
                            <div className={`flex flex-col justify-between h-full`}>
                                <div>
                                    <div
                                        className={`flex items-center w-fit rounded-xl bg-indigo-100 px-2 py-0.5 text-indigo-600 text-sm`}>
                                        <h1 className={`w-full`}>
                                            Mesas do restaurante
                                        </h1>
                                    </div>
                                    <p className={`text-gray-700 text-sm mt-3 pb-6 w-[90%]`}>
                                        Acompanhe em tempo real a atividade em cada mesa do seu restaurante.
                                        Clique no botão abaixo para acessar a sua tela de gerenciamento.
                                    </p>
                                </div>
                                <a href={`https://dasandza.github.io/neemble-eat/sessions/${restaurant.id}`}
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    <button
                                        className={`bg-black text-white rounded-md px-6 py-0.5 mt-4 text-center transition duration-150 hover:bg-gray-600 hover:-translate-y-1`}>
                                        Abrir
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h1 className='font-poppins-medium text-gray-600 pb-2'>
                        Performance
                    </h1>
                    <div
                        className='space-y-4 laptop:space-y-0 laptop:flex laptop:space-x-6 h-fit rounded-3xl p-1.5 bg-gray-50'>

                        <div className={`laptop:w-1/2 space-y-3`}>
                            <div className=''>
                                <div className={`flex space-x-3`}>
                                    <div className='space-y-4 bg-white rounded-3xl p-4 w-1/2 shadow-sm'>
                                        <div>
                                            <h2 className='text-sm text-gray-400 font-poppins-semibold'>
                                                Usuários em Agosto
                                            </h2>
                                            <p className='text-2xl my-4 font-poppins-semibold'>
                                                1056
                                            </p>
                                        </div>
                                    </div>
                                    <div className='space-y-4 bg-white rounded-3xl p-4 w-1/2 shadow-sm'>
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
                                    <div className='space-y-4 rounded-3xl bg-white p-4 w-1/2 shadow-sm'>
                                        <div>
                                            <h2 className='text-sm text-gray-400 font-poppins-semibold'>
                                                Usuários em Agosto
                                            </h2>
                                            <p className='text-2xl my-4 font-poppins-semibold'>
                                                1056
                                            </p>
                                        </div>
                                    </div>
                                    <div className='space-y-4 rounded-3xl bg-white p-4 w-1/2 shadow-sm'>
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
                    <h1 className='font-poppins-medium text-gray-600 pb-2'>
                        Mais consumidos
                    </h1>
                    <div className={`w-full laptop:w-1/2`}>
                        <div className={`rounded-3xl p-1.5 bg-gray-50`}>
                            <DashboardTable restaurantID={restaurant.id}/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;