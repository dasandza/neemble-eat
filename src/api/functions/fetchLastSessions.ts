import {apiUrl, online} from "./key.ts";
import {TableSessionJson} from "../../schema.ts";

interface props {
    restaurantID: string
}

async function FetchLastSessions({restaurantID}: props) {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/restaurants/${restaurantID}/last-sessions`, {
        method: "GET",
    })
    if (response.ok) {
        const data: TableSessionJson[] = await response.json()
        return data

    }
    throw new Error("Failed to find the Sessions")
}

export default FetchLastSessions;