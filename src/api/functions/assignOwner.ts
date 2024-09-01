import {RestaurantJson} from "../../schema.ts";
import {apiUrl} from "./key.ts";

interface props {
    restaurantID: string,
    accountID: string
}


async function AssignOwner({accountID, restaurantID}: props): Promise<RestaurantJson> {
    const response = await fetch(`${window.location.protocol}//${apiUrl}/restaurants/${restaurantID}/${accountID}/representant`, {
        method: "PUT"
    })
    if (response.ok) {
        const data = await response.json()
        return {
            id: data.id,
            created_time: data.created_time,
            name: data.name,
            description: data.description,
            address: data.address,
            phoneNumber: data.phoneNumber,
            bannerURL: data.bannerURL,
            tables: data.tables,
            menus: data.menus,
            representants: data.representants
        } as RestaurantJson
    }
    throw new Error("Failed to assign manager")

}


export default AssignOwner;