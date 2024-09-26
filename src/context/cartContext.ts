import React, {createContext, useContext} from "react";
import useCart from "../hooks/useCart.ts";

interface CartContextProps {
    restaurantID: string,
    menuID: string,
    tableNumber: number,
    togglePopUp: () => void,
    customerName: string,
    setCustomerName: React.Dispatch<React.SetStateAction<string>>,
    cart: ReturnType<typeof useCart>
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);


export function useCartContext() {
    const context = useContext(CartContext)

    if (!context)
        throw new Error("useCartContext() must be used within the Context");
    return context
}