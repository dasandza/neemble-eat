import {apiUrl, online} from "./key.ts";
import {MenuItemJson} from "../../schema.ts";

interface props {
    items: MenuItemJson[]
}

async function AddCategoryItems({items}: props) {
    try {
        const formData = new FormData();
        items.forEach((item, index) => {
            formData.append(`items[${index}].categoryID`, item.categoryID);
            formData.append(`items[${index}].name`, item.name);
            formData.append(`items[${index}].description`, item.description ? item.description : "");
            formData.append(`items[${index}].price`, item.price.toString());
            if (item.imageFile)
                formData.append(`items[${index}].imageFile`, item.imageFile, item.imageFile.name);
            formData.append(`items[${index}].availability`, item.availability.toString());
        });

        // console.log(formData.entries());

        const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/categories/add-menu-items`, {
            method: "POST",
            body: formData
        })
        if (response.ok) {
            const data: MenuItemJson[] = await response.json()
            return data
        }
    } catch (error) {
        console.error(error)
    }
}

export default AddCategoryItems;