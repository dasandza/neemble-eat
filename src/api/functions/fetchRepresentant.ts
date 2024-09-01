import {RepresentantJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";

interface props {
    representatID: string
}


async function FetchRepresentant({representatID}: props) {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/representants/${representatID}`, {
        method: "GET",
    })
    if (response.ok) {
        const data = await response.json()
        return {
            id: data.id,
            created_time: data.created_time,
            UUID: data.UUID,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            role: data.role,
            restaurantID: data.restaurantID
        } as RepresentantJson
    }
    throw new Error("Failed to find the account")
}

export default FetchRepresentant;