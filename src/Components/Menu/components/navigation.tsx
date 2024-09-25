import {useMenuContext} from "../../../context/menuContext.ts";
import {Link} from "react-router-dom";
import {CartMenu, OrdersMenu} from "../../../assets/icons";

function Navigation() {

    const {menu, restaurant, tableNumber} = useMenuContext()

    return (

        <div className={`flex justify-end items-center px-4 py-4 space-x-6 prevent-select`}>
            <Link to={`/neemble-eat/o/${restaurant.id}/${menu.id}/${tableNumber}`}>
                <div
                    className={`border border-gray-300 hover:border-black transition-colors duration-200 rounded-xl px-4 py-1 flex items-center space-x-2 cursor-pointer text-sm`}>
                    <OrdersMenu/>
                    <p>
                        Pedidos
                    </p>
                </div>
            </Link>
            <Link to={`/neemble-eat/c/${restaurant.id}/${menu.id}/${tableNumber}`}>
                <div
                    className={`border border-gray-300 hover:border-black transition-colors duration-200 rounded-xl px-4 py-1 flex items-center space-x-2 cursor-pointer text-sm`}>
                    <CartMenu/>
                    <p>
                        Carrinho
                    </p>
                </div>
            </Link>
        </div>

    );
}

export default Navigation;