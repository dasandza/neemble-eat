import {Menu, MenuJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";


async function CreateMenu({name, restaurantID}: Menu): Promise<MenuJson> {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/menus/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": name,
            "restaurantID": restaurantID,
        })
    })
    if (response.ok) {
        const data = await response.json()
        return {
            id: data.id,
            created_time: data.created_time,
            name: data.name,
            description: data.description,
            restaurantID: restaurantID,
        } as MenuJson
    }
    throw new Error("Failed to create the account")

}


export default CreateMenu;