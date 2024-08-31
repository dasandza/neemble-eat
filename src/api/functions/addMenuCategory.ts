import {CategoryJson} from "../../schema.ts";
import {apiUrl} from "./key.ts";


interface props {
    name: string,
    description?: string,
    menuID: string
}


async function AddMenuCategory({menuID, name, description}: props): Promise<CategoryJson> {
    const response = await fetch(`http://${apiUrl}/menus/${menuID}/categories`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": name,
            "description": description == "" ? null : description,
            "menuID": menuID,
        })
    })
    if (response.ok) {
        const data = await response.json()
        return {
            id: data.id,
            created_time: data.created_time,
            name: data.name,
            description: data.description,
            menuID: data.menuID
        } as CategoryJson
    }
    throw new Error("Failed to create the account")

}

export default AddMenuCategory;