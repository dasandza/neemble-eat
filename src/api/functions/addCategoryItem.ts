import {MenuItemJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";


interface props {
    categoryID: string,
    name: string,
    description: string,
    price: number,
    imageFile: File,
    availability: boolean
}


async function AddCategoryItem({
                                   categoryID,
                                   imageFile,
                                   price,
                                   name,
                                   description,
                                   availability
                               }: props): Promise<MenuItemJson> {

    const formData = new FormData();
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price.toString())
    formData.append("imageFile", imageFile)
    formData.append("categoryID", categoryID)
    formData.append("availability", availability ? "True" : "False")

    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/categories/menu-item/`, {
        method: "POST",
        body: formData
    })
    if (response.ok) {
        const data = await response.json()
        return data
    }
    const errorText = await response.text();  // Getting text to see more about the error
    throw new Error(`Failed to create the item: ${errorText}`);

}

export default AddCategoryItem;