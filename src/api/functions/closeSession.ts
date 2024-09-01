import {InvoiceJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";


interface props {
    sessionID: string
    status: string
}

async function CloseSession({sessionID, status}: props): Promise<InvoiceJson> {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/table-sessions/${sessionID}/${status}/orders`, {
        method: "POST",
    })
    if (response.ok) {
        const data: InvoiceJson = await response.json()
        return data

    }
    throw new Error("Failed to close the session")
}

export default CloseSession