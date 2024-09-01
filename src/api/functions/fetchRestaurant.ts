import {RestaurantJson} from "../../schema.ts";
import {apiUrl} from "./key.ts";


interface props {
    restaurantID: string
}


async function FetchRestaurant({restaurantID}: props) {
    const response = await fetch(`${window.location.protocol}//${apiUrl}/restaurants/${restaurantID}`)
    if (response.ok) {
        const data: RestaurantJson = await response.json()


        return {
            id: data.id,
            created_time: data.created_time,
            name: data.name,
            address: data.address,
            phoneNumber: data.phoneNumber,
            representants: data.representants,
            bannerURL: data.bannerURL,
            description: data.description,
            sessions: data.sessions,
            menus: data.menus,
            tables: data.tables,
        } as RestaurantJson
    }
    throw new Error("Failed to find the restaurant")
}

export default FetchRestaurant;