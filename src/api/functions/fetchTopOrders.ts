import {apiUrl, online} from "./key.ts";

interface props {
    restaurantID: string,
}


async function FetchTopOrders({restaurantID}: props) {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/restaurants/${restaurantID}/last-orders`)
    if (response.ok) {
        const data: [string, number][] = await response.json()
        return data
    }
    const errorText = await response.text();
    throw new Error(`Failed to get the most sold items: ${errorText}`);

}


export default FetchTopOrders;


