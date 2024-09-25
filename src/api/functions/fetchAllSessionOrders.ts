import {OrderJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";
import {useQuery} from "@tanstack/react-query";
import {MINUTE} from "../../utils/helpers/timeUnits.ts";

interface props {
    sessionID: string | null
}

async function fetchAllSessionOrders({sessionID}: props): Promise<OrderJson[]> {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/table-sessions/${sessionID}/orders`, {
        method: "GET",
    })
    if (response.ok) {
        const data: OrderJson[] = await response.json()
        return data

    }
    throw new Error("Failed to get all orders")
}

function useSessionOders({sessionID}: props) {

    const {data, isLoading, error} = useQuery({
        queryKey: ["orders", sessionID],
        queryFn: () => fetchAllSessionOrders({sessionID}).then(data => data),
        enabled: sessionID != null,
        staleTime: 3 * MINUTE,
        gcTime: 5 * MINUTE
    })


    return {
        orders: data,
        isOrdersLoading: isLoading,
        ordersError: error
    }
}

export default useSessionOders;