import {RestaurantJson} from "../../schema.ts";
import {API} from "../utils.ts";
import {useQuery} from "@tanstack/react-query";
import {HOUR} from "../../utils/helpers/timeUnits.ts";

interface props {
    restaurantID: string | null
}


async function getRestaurant({restaurantID}: props): Promise<RestaurantJson> {
    try {
        const response = await API.get(`/restaurants/${restaurantID}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch restaurant:", error);
        throw new Error(`Failed to find the restaurant.`);
    }
}


function useGetRestaurant({restaurantID}: props) {

    const {
        data, isLoading, error
    } = useQuery({
        queryKey: ["GET Restaurant", restaurantID],
        queryFn: () => getRestaurant({restaurantID})
            .then(data => data),
        enabled: restaurantID != null,
        staleTime: HOUR * 24,
        gcTime: HOUR * 36,
    });


    return {
        restaurant: data,
        isRestaurantLoading: isLoading,
        restaurantError: error,
        isRestaurantAvailable: !!data
    }
}

export {useGetRestaurant, getRestaurant};