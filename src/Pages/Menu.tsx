import {MenuItem} from "../schema.ts";
import {Header, Footer, ProductPage} from "../Components/Menu";
import {useEffect, useState} from "react";
import {getCartFromLocalStorage, initializeCartInLocalStorage} from "../utils/cartCRUD.ts";
import {useParams} from "react-router-dom";
import {LoadingMenu} from "./LoadingPages";
import Loading from "./LoadingPages/Loading.tsx";
import useRestaurantData from "../api/functions/fetchRestaurant.ts";
import Categories from "../Components/Menu/components/categories.tsx";
import {MenuContext} from "../context/menuContext.ts";
import {useMenuData} from "../api/functions/fetchMenuParsed.ts";


function Menu() {

    const {restaurantID, menuID, tableNumber} = useParams() as unknown as {
        restaurantID: string,
        menuID: string,
        tableNumber: number
    };

    const existingCart = getCartFromLocalStorage()
    if (!existingCart) {
        initializeCartInLocalStorage()
    }

    const open = true
    const {restaurant, isRestaurantLoading} = useRestaurantData({restaurantID})
    const {menu, isMenuLoading} = useMenuData({menuID});

    const [selectedItem, setSelectedItem] = useState<MenuItem | null>()


    useEffect(() => {
        const handleBeforeUnload = () => {

            // To show a confirmation dialog:
            sessionStorage.removeItem("Menu"
            )
        };

        // Add event listener for before unload
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    if (selectedItem && restaurant) {
        return <ProductPage item={selectedItem}
                            disSelectItem={() => setSelectedItem(null)}
                            menuID={menuID}
                            restaurantID={restaurant?.id}
                            tableNumber={tableNumber}/>
    }

    return (
        <Loading LoadingPage={LoadingMenu}
                 loadingParams={[isRestaurantLoading, isMenuLoading]}>
            {
                menu && restaurant &&
                <MenuContext.Provider value={{
                    menu: menu,
                    restaurant: restaurant,
                    open: open,
                    tableNumber: tableNumber,
                    setSelectedItem: (item) => setSelectedItem(item)
                }}>
                    <Header/>
                    <Categories/>
                    <Footer/>
                </MenuContext.Provider>
            }
        </Loading>

    );
}

export default Menu;
