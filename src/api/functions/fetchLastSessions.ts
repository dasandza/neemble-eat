import {apiUrl} from "./key.ts";
import {TableSessionJson} from "../../schema.ts";

interface props {
    restaurantID: string
}

async function FetchLastSessions({restaurantID}: props) {
    const response = await fetch(`${window.location.protocol}//${apiUrl}/restaurants/${restaurantID}/last-sessions`, {
        method: "GET",
    })
    if (response.ok) {
        const data: TableSessionJson[] = await response.json()
        return data

    }
    throw new Error("Failed to find the Sessions")
}

export default FetchLastSessions;