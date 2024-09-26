import {Restaurant, RestaurantJson} from "../../schema.ts";
import {API, handleError} from "../utils.ts";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";

async function createRestaurant({
                                    name,
                                    description,
                                    address,
                                    phoneNumber,
                                    bannerFile
                                }: Restaurant): Promise<RestaurantJson> {

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    formData.append("bannerFile", bannerFile);

    try {
        const response = await API.post("/restaurants", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return handleError(error)
        }
        throw error;
    }
}


function useCreateRestaurant() {
    const {data, error, mutateAsync, isSuccess, isPending} = useMutation({
        mutationFn: createRestaurant,
        onSuccess: data => {
            console.log('Restaurant created:', data);
        },
        onError: error => {
            console.error(error)
        }
    })


    return {
        restaurant: data ? data : null,
        error: error,
        mutateAsync: mutateAsync,
        isSuccess: isSuccess,
        isPending: isPending,
    }
}


export {
    createRestaurant,
    useCreateRestaurant
};