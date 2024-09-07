import {MenuItemJson} from "../schema.ts";
import AddCategoryItem from "../api/functions/addCategoryItem.ts";
import {deleteMenuItems, updateCategory, updateItem} from "../api";

interface props {
    restaurantID: string,
    categoryID: string,
    name: { name?: string },
    updateItems: { [key: string]: { [key: string]: string | number | boolean | undefined | null | File; } },
    addItems: MenuItemJson[],
    deleteItems: { id?: string }[]

}


async function UpdateCategory({restaurantID, updateItems, addItems, deleteItems, name, categoryID}: props) {

    console.log("New Name: ", name)
    console.log("Updated Items: ", updateItems)
    console.log("Added Items: ", addItems)
    console.log("Deleted Items: ", deleteItems)

    // Add items to the database
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

    // Delete items from the database
    if (deleteItems.length > 0) {
        const items = deleteItems.map((item) => item.id)
        const itemsID = items.filter((id) => id != undefined)
        await deleteMenuItems({
            categoryID: categoryID,
            menuItemsIDArray: itemsID
        }).then((category) => console.log(category))
    }

    // Update items in the database
    const updateIDS = Object.keys(updateItems)
    if (updateIDS.length > 0) {
        for (const id in updateItems) {
            const item = await updateItem(id, {
                categoryID: categoryID,
                restaurantID: restaurantID,
                imageFile: updateItems[id]["imageFile"] as File | undefined,
                name: updateItems[id]["name"] as string,
                price: updateItems[id]["price"] as number,
                description: updateItems[id]["description"] as string,
                availability: updateItems[id]["availability"] as boolean,
            })
            console.log("Response: ", item)
        }
    }

    // Change Category name
    if (name.name != undefined) {
        await updateCategory({
            name: name.name,
            categoryID: categoryID,
        })
    }

    return [addedItems]
}

export default UpdateCategory;