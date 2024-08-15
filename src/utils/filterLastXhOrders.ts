import {AirtableOrders} from "../interfaces.tsx";

function filterLastXhOrders(order: AirtableOrders, h: number = 23): boolean {

    const orderDate = new Date(order.createdTime);
    const now = new Date(new Date().getTime());

    const diffInMs = now.getTime() - orderDate.getTime();
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return hours <= h
}

export default filterLastXhOrders;