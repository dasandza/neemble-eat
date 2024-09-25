import {useMenuContext} from "../../../context/menuContext.ts";

function RestaurantInfo() {

    const {restaurant} = useMenuContext()

    return (
        <div>
            <div className={`laptop:w-[40%] py-4`}>
                <h1 className={`text-4xl font-poppins-semibold`}>
                    {restaurant.name}
                </h1>
            </div>
            <div className={`laptop:w-[60%]`}>
                <p className={`hidden laptop:block`}>
                    {restaurant.description}
                </p>
            </div>
        </div>
    );
}

export default RestaurantInfo;