import {apiUrl, online} from "./key.ts";
import {CategoryJson} from "../../schema.ts";


interface props {
    categoryID: string
    menuItemsIDArray: string[]
}


async function DeleteMenuItems({categoryID, menuItemsIDArray}: props) {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/categories/${categoryID}/orders`, {
        method: "DELETE",
        body: JSON.stringify(menuItemsIDArray)
    })
    if (response.ok) {
        const data: CategoryJson[] = await response.json()
        return data
    }
    const errorText = await response.text();
    throw new Error(`Failed to delete the items: ${errorText}`);

}


export default DeleteMenuItems;