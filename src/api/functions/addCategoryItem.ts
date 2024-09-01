import {MenuItemJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";

interface props {
    categoryID: string,
    name: string,
    description: string,
    price: number,
    imageFile: File
}


async function AddCategoryItem({categoryID, imageFile, price, name, description}: props): Promise<MenuItemJson> {

    const formData = new FormData();
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price.toString())
    formData.append("imageFile", imageFile)
    formData.append("categoryID", categoryID)

    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/categories/menuItem`, {
        method: "POST",
        body: formData
    })
    if (response.ok) {
        const data: MenuItemJson = await response.json()
        return data
    }
    throw new Error("Failed to create the item")

}

export default AddCategoryItem;