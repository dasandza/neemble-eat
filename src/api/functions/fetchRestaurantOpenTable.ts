import {apiUrl} from "./key.ts";
import {TableSessionJson} from "../../schema.ts";


interface props {
    restaurantID: string
    tableNumber: number
}


async function FetchRestaurantOpenTable({tableNumber, restaurantID}: props) {
    const response = await fetch(`${window.location.protocol}//${apiUrl}/restaurants/${restaurantID}/${tableNumber}/open-session`, {
        method: "GET",
    })
    if (response.ok) {
        const data: TableSessionJson = await response.json()
        return data

    }
    throw new Error("Failed to find the session.")
}

export default FetchRestaurantOpenTable;