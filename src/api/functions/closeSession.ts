import {TableSessionJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";


interface props {
    sessionID: string
    status: string
}

async function CloseSession({sessionID, status}: props): Promise<TableSessionJson> {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/table-sessions/${sessionID}/${status}/orders`, {
        method: "POST",
    })
    if (response.ok) {
        return await response.json()

    }
    throw new Error("Failed to close the session")
}

export default CloseSession