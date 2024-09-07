import {apiUrl, online} from "./key.ts";
import {CategoryJson} from "../../schema.ts";


interface props {
    categoryID: string,
    name: string
}

async function UpdateCategory({categoryID, name}: props) {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/categories/${categoryID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
    })
    if (response.ok) {
        const data: CategoryJson = await response.json()
        return data
    }
    const errorText = await response.text();
    throw new Error(`Failed to update the category: ${errorText}`);
}


export default UpdateCategory;