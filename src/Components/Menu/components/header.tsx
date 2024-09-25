import Navigation from "./navigation.tsx";
import Banner from "./banner.tsx";
import RestaurantInfo from "./restaurantInfo.tsx";
import TableInfo from "./tableInfo.tsx";


function Header() {
    return (
        <div>
            <Navigation/>
            <Banner/>
            <div className={`px-4`}>
                <RestaurantInfo/>
                <TableInfo/>
            </div>
        </div>
    );
}

export default Header;


