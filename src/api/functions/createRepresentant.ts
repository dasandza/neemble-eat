import {RepresentantJson, Representant} from "../../schema.ts";
import {apiUrl} from "./key.ts";


async function CreateRepresentant({
                                      UUID,
                                      firstName,
                                      lastName,
                                      email,
                                      phoneNumber,
                                      role
                                  }: Representant): Promise<RepresentantJson> {
    //const apiUrl = import.meta.env.VITE_FIREBASE_API_KEY;
    const response = await fetch(`${window.location.protocol}//${apiUrl}/representants/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "UUID": UUID,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phoneNumber": phoneNumber,
            "role": role
        }),
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
            role: data.role
        } as RepresentantJson
    }
    throw new Error("Failed to create the account")
}


export default CreateRepresentant;