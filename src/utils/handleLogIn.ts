import {NavigateFunction} from "react-router-dom";
import {RepresentantJson} from "../schema.ts";
import {fetchRepresentantByUUID} from "../api";


interface props {
    UUID: string
    navigate: NavigateFunction
}

async function HandleLogIn({UUID, navigate}: props) {
    try {
        const representant: RepresentantJson | undefined = await fetchRepresentantByUUID({UUID: UUID})
        if (representant) {
            if (!representant.restaurantID) {
                navigate(`/neemble-eat/setup/${representant.id}/${representant.firstName}`)
            } else {
                navigate(`/neemble-eat/user/rep/${representant.id}`)
            }
        }
    } catch (error) {
        console.log(error)
    }


}

export default HandleLogIn;

