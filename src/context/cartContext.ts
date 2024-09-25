import React, {createContext, useContext} from "react";
import useCart from "../hooks/useCart.ts";

export const CartContext = createContext<{
    restaurantID: string,
    menuID: string,
    tableNumber: number,
    togglePopUp: () => void,
    customerName: string,
    setCustomerName: React.Dispatch<React.SetStateAction<string>>,
    cart: ReturnType<typeof useCart>
} | undefined>(undefined);


export function useCartContext() {
    const context = useContext(CartContext)

    if (!context)
        throw new Error("useCartContext() must be used within the Context");
    const {restaurantID, customerName, togglePopUp, menuID, tableNumber, setCustomerName, cart} = context
    return {restaurantID, customerName, togglePopUp, menuID, tableNumber, setCustomerName, cart}
}