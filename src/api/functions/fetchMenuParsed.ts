import {MenuParsed} from "../../schema.ts";
import {apiUrl} from "./key.ts";

interface props {
    menuID: string
}


async function FetchMenuParsed({menuID}: props) {
    const response = await fetch(`${window.location.protocol}//${apiUrl}/menus/${menuID}/parse`, {
        method: "GET",
    })
    if (response.ok) {
        const data: MenuParsed = await response.json()
        return data

    }
    throw new Error("Failed to find the menu")
}

export default FetchMenuParsed;