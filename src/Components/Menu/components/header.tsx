import banner from '../../../assets/images/banner.jpeg'
import {CartMenu, Check, CrossSign, OrdersMenu} from "../../../assets/icons";
import Notifications from "../../../assets/icons/Notifications.tsx";
import {Link} from "react-router-dom";


interface props {
    restaurantID: string
    restaurantName: string
    description: string
    open: boolean
    tableNumber: number
    menuID: string
}

function Header({restaurantName, restaurantID, description, open, tableNumber, menuID}: props) {

    const closedRestaurant = <div
        className='font-medium px-2 py-0.5 rounded-xl flex justify-center items-center bg-gray-100 w-fit'>
        <CrossSign className='mr-1 mt-0.5'></CrossSign>
        <p className='prevent-select cursor-default'>Fechado</p>
    </div>

    const openRestaurant = <div
        className='font-medium px-2 py-0.5 rounded-xl flex justify-center items-center bg-green-100 w-fit'>
        <Check className='mr-1 mt-0.5'></Check>
        <p className='prevent-select text-emerald-800 cursor-default '>Aberto</p>
    </div>


    return (
        <div>
            <div className={`flex justify-end items-center px-4 py-4 space-x-6 prevent-select`}>
                <Link to={`/neemble-eat/o/${restaurantID}/${menuID}/${tableNumber}`}>
                    <div
                        className={`border border-gray-300 hover:border-black transition-colors duration-200 rounded-xl px-4 py-1 flex items-center space-x-2 cursor-pointer text-sm`}>
                        <OrdersMenu/>
                        <p>
                            Pedidos
                        </p>
                    </div>
                </Link>
                <Link to={`/neemble-eat/c/${restaurantID}/${menuID}/${tableNumber}`}>
                    <div
                        className={`border border-gray-300 hover:border-black transition-colors duration-200 rounded-xl px-4 py-1 flex items-center space-x-2 cursor-pointer text-sm`}>
                        <CartMenu/>
                        <p>
                            Carrinho
                        </p>
                    </div>
                </Link>
            </div>
            <div className={``}>
                <div
                    className='bg-gray-400 justify-center flex items-center overflow-hidden'>
                    <img
                        src={banner}
                        alt="description of image"
                        className='object-cover w-full max-h-40 laptop:max-h-60'
                    />
                </div>
                <div className={`px-4`}>
                    <div className={`laptop:w-[40%] py-4`}>
                        <h1 className={`text-4xl font-poppins-semibold`}>
                            {restaurantName}
                        </h1>
                    </div>
                    <div className={`laptop:w-[60%]`}>
                        <p className={`hidden laptop:block`}>
                            {description}
                        </p>
                    </div>
                    <div className={`my-4 flex space-x-4`}>
                        {open ? openRestaurant : closedRestaurant}
                        <div
                            className={`flex justify-center rounded-xl bg-gray-100 space-x-1 px-3 py-0.5 text-gray-600 font-poppins-semibold prevent-select`}>
                            <p>
                                Mesa
                            </p>
                            <p>
                                {tableNumber}
                            </p>
                        </div>
                        <div
                            className='flex ml-5 items-center rounded-xl px-1.5 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer duration-300 py-0.5 prevent-select '>
                            <Notifications className='m-1 laptop:mr-1 laptop:my-0 laptop:ml-0'/>
                            <p className='font-poppins-regular hidden laptop:block'>Chamar Garçon</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Header;