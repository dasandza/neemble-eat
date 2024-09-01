import {apiUrl, online} from "./key.ts";
import {TableSessionJson} from "../../schema.ts";


interface props {
    restaurantID: string
    tableNumber: number
}


async function FetchRestaurantOpenTable({tableNumber, restaurantID}: props) {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/restaurants/${restaurantID}/${tableNumber}/open-session`, {
        method: "GET",
    })
    if (response.ok) {
        const data: TableSessionJson = await response.json()
        return data

    }
    throw new Error("Failed to find the session.")
}

export default FetchRestaurantOpenTable;