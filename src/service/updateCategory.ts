import {MenuItemJson} from "../schema.ts";
import AddCategoryItem from "../api/functions/addCategoryItem.ts";

interface props {
    name: { name?: string },
    updateItems: { [key: string]: { [key: string]: string | number | boolean | undefined | null | File; } },
    addItems: MenuItemJson[],
    deleteItems: { id?: string }[]

}


async function UpdateCategory({updateItems, addItems, deleteItems, name}: props) {

    console.log("New Name: ", name)
    console.log("Updated Items: ", updateItems)
    console.log("Added Items: ", addItems)
    console.log("Deleted Items: ", deleteItems)

    const addedItems: MenuItemJson[] = []
    if (addItems.length > 0) {
        for (const item of addItems) {
            if (item.imageFile && item.id == undefined) {
                const response = await AddCategoryItem({
                    categoryID: item.categoryID,
                    imageFile: item.imageFile,
                    price: item.price,
                    name: item.name,
                    description: item.description ? item.description : "",
                    availability: item.availability
                })
                addedItems.push(response)
                console.log("Response: ", response)
            }

        }
    }


    return [addedItems]
}

export default UpdateCategory;