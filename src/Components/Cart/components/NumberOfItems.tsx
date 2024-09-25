import {useEffect, useState} from "react";
import {getItemsInTheCartNumber} from "../../../utils/cartCRUD.ts";
import {useCartContext} from "../../../context/cartContext.ts";

function NumberOfItems() {
    const {cart} = useCartContext()
    const [numberOfItems, setNumberOfItems] = useState<number>(getItemsInTheCartNumber(cart.cart))

    useEffect(() => {
        setNumberOfItems(getItemsInTheCartNumber(cart.cart))
    }, [cart.cart]);

    return (
        <div className='mt-5'>
            {numberOfItems == 1 ?
                <p>
                    {numberOfItems} item
                </p> :
                <p>
                    {numberOfItems} itens
                </p>
            }
        </div>
    );
}

export default NumberOfItems;