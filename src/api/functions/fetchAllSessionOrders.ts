import {OrderJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";

interface props {
    sessionID: string
}


async function FetchAllSessionOrders({sessionID}: props): Promise<OrderJson[]> {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/table-sessions/${sessionID}/orders`, {
        method: "GET",
    })
    if (response.ok) {
        const data: OrderJson[] = await response.json()
        return data

    }
    throw new Error("Failed to get all orders")
}

export default FetchAllSessionOrders;