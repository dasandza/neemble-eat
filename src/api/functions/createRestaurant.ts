import {Restaurant, RestaurantJson} from "../../schema.ts";
import {apiUrl} from "./key.ts";

async function CreateRestaurant({
                                    name,
                                    description,
                                    address,
                                    phoneNumber,
                                    bannerFile
                                }: Restaurant): Promise<RestaurantJson> {

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    formData.append("bannerFile", bannerFile);

    const response = await fetch(`${window.location.protocol}//${apiUrl}/restaurants/`, {
        method: "POST",
        body: formData
    });
    if (response.ok) {
        const data: RestaurantJson = await response.json()
        return data
    }
    throw new Error("Failed to create the restaurant")
}

export default CreateRestaurant;