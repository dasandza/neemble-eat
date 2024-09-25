import useRestaurantData from "../api/functions/fetchRestaurant.ts";

function Test() {


    const restaurantID = "FUHT4zQL5Umz99BN7dUI"

    const {restaurant} = useRestaurantData({restaurantID: restaurantID});


    return (
        <div className="relative">
            {
                restaurant ? restaurant.name : "espera"
            }
        </div>
    );
}

export default Test;