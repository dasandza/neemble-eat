import {apiUrl} from "./key.ts";
import {OrderJson} from "../../schema.ts";


interface props {
    orderID: string
    newStatus: string
}

async function UpdateOrder({orderID, newStatus}: props) {
    const response = await fetch(`${window.location.protocol}//${apiUrl}/orders/${orderID}/${newStatus}`, {
        method: "PUT",
    })
    if (response.ok) {
        const data: OrderJson = await response.json()
        return data
    }
}


export default UpdateOrder;