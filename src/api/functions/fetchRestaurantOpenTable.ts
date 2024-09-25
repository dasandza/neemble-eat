import {apiUrl, online} from "./key.ts";
import {TableSessionJson} from "../../schema.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {MINUTE} from "../../utils/helpers/timeUnits.ts";


interface props {
    restaurantID: string
    tableNumber: number
}


interface hookProps extends props {
    closeSession?: () => Promise<void>
}


async function fetchRestaurantOpenTable({tableNumber, restaurantID}: props) {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/restaurants/${restaurantID}/${tableNumber}/open-session`, {
        method: "GET",
    })
    if (response.ok) {
        const data: TableSessionJson = await response.json()
        return data

    }
    throw new Error("Failed to find the session.")
}

function useOpenSession({closeSession, restaurantID, tableNumber}: hookProps) {

    const queryClient = useQueryClient()

    const {data, isLoading, error} = useQuery({
        queryKey: ["open-session", restaurantID, tableNumber],
        queryFn: () => fetchRestaurantOpenTable({
            tableNumber: tableNumber,
            restaurantID: restaurantID
        }).then(data => data),
        staleTime: 2 * MINUTE,
    })

    const {mutateAsync: closeSessionMutation} = useMutation({
        mutationFn: closeSession,
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: ["open-session", restaurantID, tableNumber]
            }).catch((error) => console.error(error))
        }
    })

    return {
        session: data,
        isSessionLoading: isLoading,
        sessionError: error,
        ...closeSession ? {closeSessionMutation: closeSessionMutation} : {}

    }
}

export default useOpenSession;