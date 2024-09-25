import {createContext, useContext} from "react";
import {RestaurantJson, Menu, MenuItem} from "../schema.ts";


export const MenuContext = createContext<{
    restaurant: RestaurantJson,
    menu: Menu,
    open: boolean,
    tableNumber: number,
    setSelectedItem: (item: MenuItem) => void
} | undefined>(undefined);

export function useMenuContext() {
    const data = useContext(MenuContext)
    if (!data)
        throw new Error("useMenuContext() must be used within the Context");
    const {menu, restaurant, open, tableNumber, setSelectedItem} = data
    return {menu, restaurant, open, tableNumber, setSelectedItem}
}