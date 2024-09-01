import {OrderJson, OrderStatus, SessionStatus} from "../../schema.ts";
import {apiUrl} from "./key.ts";


interface props {
    restaurantID: string
}


async function FetchAllRestaurantOrders({restaurantID}: props): Promise<OrderJson[]> {
    const response = await fetch(`${window.location.protocol}//${apiUrl}/restaurants/${restaurantID}/orders`)
    if (response.ok) {
        const data = await response.json()
        return data.map((order: {
            id: string,
            created_time: string,
            sessionID?: string
            orderTime?: string,
            itemID?: string,
            unitPrice?: number,
            total?: number,
            orderedItemName?: string,
            quantity?: number,
            delivered?: boolean,
            prepStatus?: OrderStatus,
            tableNumber?: number,
            sessionStatus?: SessionStatus
        }) => {
            return {
                id: order.id,
                created_time: order.created_time,
                sessionID: order.sessionID,
                orderTime: order.orderTime,
                itemID: order.itemID,
                unitPrice: order.unitPrice,
                total: order.total,
                orderedItemName: order.orderedItemName,
                quantity: order.quantity,
                delivered: order.delivered,
                prepStatus: order.prepStatus,
                tableNumber: order.tableNumber,
                sessionStatus: order.sessionStatus,
            } as OrderJson
        })
    }
    throw new Error("Failed to find the account")
}

export default FetchAllRestaurantOrders;