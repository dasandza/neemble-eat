import {Link} from "react-router-dom";
import {useCartContext} from "../../../context/cartContext.ts";

function CartPopUp() {

    const {menuID, tableNumber, togglePopUp, restaurantID, customerName} = useCartContext()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-11/12 max-w-lg p-6 bg-white rounded shadow-lg">
                <Link to={`/neemble-eat/o/${restaurantID}/${menuID}/${tableNumber}`}>
                    <button
                        onClick={togglePopUp}
                        className="absolute top-0 right-0 mt-3 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                        &times;
                    </button>
                </Link>
                <h2 className="mb-4 text-xl font-bold">
                    Pedido confirmado{customerName == "" ? "!" : `, ${customerName}!`}
                </h2>
                <p className="mb-4">Aguarde que um garçon levará o seu pedido em breve.</p>
                <Link to={`/neemble-eat/o/${restaurantID}/${menuID}/${tableNumber}`}>
                    <button
                        onClick={togglePopUp}
                        className="px-7 py-1 text-white bg-black rounded-md focus:outline-none"
                    >
                        Fechar
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default CartPopUp;