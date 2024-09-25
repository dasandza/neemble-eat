import {OrderJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
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

    const queryClient = useQueryClient()

    const {data, isLoading, error, isFetching} = useQuery({
        queryKey: ["orders", sessionID],
        queryFn: () => fetchAllSessionOrders({sessionID}).then(data => data),
        enabled: sessionID != null,
        staleTime: 3 * MINUTE,
        gcTime: 5 * MINUTE
    })

    const {mutateAsync: refreshOrders} = useMutation({
        mutationFn: async () => {
        },
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: ["orders", sessionID]
            }).catch((error) => console.error(error))
        }
    })


    return {
        orders: data,
        isOrdersLoading: isLoading,
        ordersError: error,
        isFetchingOrders: isFetching,
        refreshOrders
    }
}

export default useSessionOders;