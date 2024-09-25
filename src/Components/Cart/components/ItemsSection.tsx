import {CartSingleItem} from "../index.ts";
import {useCartContext} from "../../../context/cartContext.ts";

function ItemsSection() {

    const {cart, restaurantID, tableNumber, menuID} = useCartContext()

    return (
        <div className='mx-0 mb-32 divide-y divide-gray-300'>
            {
                cart.cart.map((item, index: number) =>
                        item != undefined && <div key={index} className='mt-3'>
                            <CartSingleItem
                                itemIndex={index}
                                menuID={menuID}
                                restaurantID={restaurantID}
                                tableNumber={tableNumber}/>
                        </div>
                )
            }
        </div>
    );
}

export default ItemsSection;