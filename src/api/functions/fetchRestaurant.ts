import {RestaurantJson} from "../../schema.ts";
import {apiUrl, online} from "./key.ts";
import axios from 'axios';

import {useQuery} from "@tanstack/react-query";
import {HOUR} from "../../utils/helpers/timeUnits.ts";

interface props {
    restaurantID: string
}


async function fetchRestaurantData({restaurantID}: props): Promise<RestaurantJson> {
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

export {useRestaurantData, fetchRestaurantData};