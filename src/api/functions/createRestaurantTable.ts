import {TableJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";

interface props {
    restaurantID: string,
}


async function CreateRestaurantTable({restaurantID}: props): Promise<TableJson> {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/restaurants/${restaurantID}/tables`, {
        method: "PUT",
    })
    if (response.ok) {
        const data = await response.json()
        return {
            id: data.id,
            created_time: data.created_time,
            number: data.number,
            currentSessionID: data.currentSessionID,
            sessionStatus: data.sessionStatus,
            sessionOrders: data.sessionOrders,
            restaurantID: data.restaurantID,
            link: data.link,
        } as TableJson
    }
    throw new Error("Failed to add a table")
}


export default CreateRestaurantTable;