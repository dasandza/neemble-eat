import {OrderJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";


interface props {
    restaurantID: string
}


async function FetchAllRestaurantOrders({restaurantID}: props): Promise<OrderJson[]> {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/restaurants/${restaurantID}/orders`)
    if (response.ok) {
        const data: OrderJson[] = await response.json()
        return data
    }
    throw new Error("Failed to find the account")
}

export default FetchAllRestaurantOrders;