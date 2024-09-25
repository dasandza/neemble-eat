import {Menu} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";
import axios from 'axios';
import {useQuery} from "@tanstack/react-query";
import {HOUR} from "../../utils/helpers/timeUnits.ts";

interface props {
    menuID: string
}

interface hookProps extends props {
    getStale?: boolean
}


async function fetchMenuParsed({menuID}: props): Promise<Menu> {
    try {
        const response = await axios.get(`${online ? "https:" : "http:"}//${apiUrl}/menus/${menuID}/parse`)
        return response.data

    } catch {
        throw new Error("Failed to find the menu")
    }
}


function useMenuData({menuID}: hookProps) {
    const {
        data: menu, error: menuError, isLoading: isMenuLoading,
    } = useQuery({
        queryKey: ["menuRestaurantID", menuID],
        queryFn: () => fetchMenuParsed({menuID})
            .then(data => data),
        enabled: !!menuID,
        staleTime: HOUR * 3,
        gcTime: HOUR * 6,
    });

    return {
        menu,
        isMenuLoading,
        menuError,
        isMenuAvailable: !!menu
    }
}

export {useMenuData, fetchMenuParsed};