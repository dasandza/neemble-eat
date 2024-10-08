import {apiUrl, online} from "./key.ts";
import {OrderJson} from "../../schema.ts";


interface props {
    orderID: string
    newStatus: string
}

async function UpdateOrder({orderID, newStatus}: props) {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/orders/${orderID}/${newStatus}`, {
        method: "PUT",
    })
    if (response.ok) {
        const data: OrderJson = await response.json()
        return data
    }
    const errorText = await response.text();
    throw new Error(`Failed to update the order: ${errorText}`);
}


export default UpdateOrder;