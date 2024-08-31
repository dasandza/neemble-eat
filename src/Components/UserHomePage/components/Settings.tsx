import {RestaurantJson} from "../../../schema.ts";
import {useEffect, useState} from "react";


function Settings() {

    const [restaurant, setRestaurant] = useState<RestaurantJson | null>(null)

    const [restaurantName, setRestaurantName] = useState<string>()
    // const [phoneNumber, setPhoneNumber] = useState<string>()
    // const [address, setAddress] = useState<string>()
    // const [description, setDescription] = useState<string>()

    useEffect(() => {
        const storedRestaurantantData = sessionStorage.getItem("Restaurant")
        const restaurantJson: RestaurantJson = storedRestaurantantData ? JSON.parse(storedRestaurantantData) : null
        setRestaurant(restaurantJson)
    }, []);

    if (!restaurant) {
        return <div></div>
    }

    return (
        <div>
            <h1 className='font-poppins-semibold text-lg my-4 text-gray-400 mx-2'>
                Definições
            </h1>
            <div className={`space-y-4`}>
                <div className={`w-full bg-white rounded-xl p-4`}>
                    <div className={`space-y-2 `}>
                        <div className={`flex px-3 py-4 rounded-xl`}>
                            <h1 className={`font-poppins-semibold`}>
                                Nome do restaurante
                            </h1>
                            <input type="text"
                                   value={restaurantName}
                                   onChange={(e) => setRestaurantName(e.target.value)}
                                   className={"border-b-[1.5px] placeholder-gray-500 border-gray-200 text-sm p-1 mx-4"}
                                   placeholder={restaurant.name}/>
                        </div>
                        <div className={`px-3 py-4 hover:bg-gray-100 rounded-xl`}>
                            <h1 className={`font-poppins-semibold`}>
                                Número de telefone:
                            </h1>
                        </div>
                        <div className={`px-3 py-4 hover:bg-gray-100 rounded-xl`}>
                            <h1 className={`font-poppins-semibold`}>
                                Endereço:
                            </h1>
                        </div>
                        <div className={`px-3 py-4 hover:bg-gray-100 rounded-xl`}>
                            <h1 className={`font-poppins-semibold`}>
                                Descrição:
                            </h1>
                        </div>
                    </div>


                </div>

                <div>
                    <div className={`w-full bg-white rounded-xl p-4 laptop:flex`}>
                        <div className={`w-fulll laptop:block laptop:w-1/2 shadow-md bg-gray-100 rounded-xl p-3`}>
                            <h1 className='laptop:text-lg text-gray-800 mb-8 font-poppins-semibold'>
                                Adicione membros da sua equipe à gerencia do seu restaurante.
                            </h1>
                            <button
                                className={`w-[60%] laptop:w-full font-poppins-semibold py-2 laptop:py-1 rounded-full bg-black text-sm laptop:text-base text-white text-center`}>
                                Convide um membro
                            </button>
                        </div>
                        <div className={`w-fulll laptop:w-1/2 p-3 text-sm laptop:text-base italic text-gray-500`}>
                            <p>
                                A sua conta permite-lhe adicionar até 3 membros para o gerenciamento do seu restaurante.
                                Quando desejar, pode alterar cargos, adicionar ou remover membros.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Settings;