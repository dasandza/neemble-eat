import {Menu, MenuJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";


async function CreateMenu({name, restaurantID}: Menu): Promise<MenuJson> {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/restaurants/${restaurantID}/menus`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": name,
            "restaurantID": restaurantID,
        })
    })
    if (response.ok) {
        const data: MenuJson = await response.json()
        return data
    }
    const errorText = await response.text();
    throw new Error(`Failed to create the account: ${errorText}`)

}


export default CreateMenu;