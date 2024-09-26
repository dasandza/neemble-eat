import {createContext, useContext} from "react";
import {RepresentantJson, RestaurantJson} from "../schema.ts";

interface UserPageContextProps {
    restaurant: RestaurantJson
    representant: RepresentantJson
}


export const UserPageContext = createContext<UserPageContextProps | undefined>(undefined)


export function useUserPageContext() {
    const context = useContext(UserPageContext);

    if (!context)
        throw new Error("useUserPageContext() must be used within the Context");

    return context

}