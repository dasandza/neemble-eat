import {RestaurantJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";
import axios from 'axios';

import {useQuery} from "@tanstack/react-query";
import {HOUR} from "../../utils/helpers/timeUnits.ts";

interface props {
    restaurantID: string
}


export async function fetchRestaurantData({restaurantID}: props): Promise<RestaurantJson> {
    try {
        const response = await axios.get(`${online ? "https:" : "http:"}//${apiUrl}/restaurants/${restaurantID}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch restaurant:", error);
        throw new Error(`Failed to find the restaurant.`);
    }
}


function useRestaurantData({restaurantID}: props) {

    const {
        data, isLoading, error
    } = useQuery({
        queryKey: ["restaurantID", restaurantID],
        queryFn: () => fetchRestaurantData({restaurantID})
            .then(data => data),
        enabled: !!restaurantID,
        staleTime: HOUR * 24, // Data remains fresh for 2 hours
        gcTime: HOUR * 36, // Cache data for 5 hours
    });


    return {
        restaurant: data,
        isRestaurantLoading: isLoading,
        restaurantError: error,
        isRestaurantAvailable: !!data
    }
}

export default useRestaurantData;