import {apiUrl} from "./key.ts";
import {TableSessionJson, Order} from "../../schema.ts";


async function AddOrder({sessionID, itemID, quantity, additionalNote}: Order) {
    const response = await fetch(`${window.location.protocol}//${apiUrl}/table-sessions/${sessionID}/orders`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quantity: quantity,
            itemID: itemID,
            sessionID: sessionID,
            additionalNote: additionalNote ? additionalNote : ""
        }),
    })
    if (response.ok) {
        const data: TableSessionJson = await response.json()
        return data
    }
    throw new Error("Failed to add the order")

}


export default AddOrder;