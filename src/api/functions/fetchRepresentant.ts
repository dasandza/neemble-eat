import {RepresentantJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";
import {useQuery} from "@tanstack/react-query";
import {HOUR} from "../../utils/helpers/timeUnits.ts";

interface props {
    representatID: string
}


async function fetchRepresentant({representatID}: props): Promise<RepresentantJson> {
    const response = await fetch(`${online ? "https:" : "http:"}//${apiUrl}/representants/${representatID}`, {
        method: "GET",
    })
    if (response.ok) {
        return await response.json()
    }
    throw new Error("Failed to find the account")
}


function useRepresentantData({representatID}: props) {
    const {
        data,
        isLoading,
        isFetching,
        error,
        refetch
    } = useQuery({
        queryKey: ["GET-Representant", representatID],
        queryFn: () => fetchRepresentant({representatID: representatID})
            .then(data => data),
        staleTime: 5 * HOUR,
        gcTime: HOUR * 24,
    })

    return {
        representant: data,
        isRepresentantLoading: isLoading,
        isRepresentantFetching: isFetching,
        representantError: error,
        refetchRepresentant: refetch
    }


}


export {
    fetchRepresentant,
    useRepresentantData
}

