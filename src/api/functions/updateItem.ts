import {apiUrl, online} from "./key.ts";
import {MenuItemJson} from "../../schema.ts";


interface Item {
    restaurantID: string,
    name?: string | undefined,
    description?: string | undefined,
    categoryID: string,
    availability?: boolean | undefined,
    price?: number | undefined,
    imageFile?: File | undefined
}

async function UpdateItem(menuItemId: string, {
    restaurantID,
    name,
    imageFile,
    price,
    categoryID,
    availability,
    description
}: Item) {
    const formData = new FormData();
    formData.append("restaurant_id", restaurantID)
    if (name)
        formData.append("name", name)
    if (imageFile)
        formData.append("imageFile", imageFile)
    if (price)
        formData.append("price", price.toString())
    if (categoryID)
        formData.append("categoryID", categoryID)
    if (availability != undefined)
        formData.append("availability", availability ? "True" : "False")
    if (description)
        formData.append("description", description)


    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/menu-items/${menuItemId}`, {
        method: "PUT",
        body: formData
    })
    if (response.ok) {
        const data: MenuItemJson = await response.json()
        return data
    }
    const errorText = await response.text();
    throw new Error(`Failed to update the item: ${errorText}`);


}

export default UpdateItem;