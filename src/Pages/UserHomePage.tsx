import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Banner, LeftSideBar, Body} from "../Components/UserHomePage";
import {MenuOption} from "../interfaces.tsx";
import {fetchRepresentant, fetchRestaurant} from "../api";
import {RepresentantJson, RestaurantJson} from "../schema.ts";
import {
    DashboardIconNotSelected,
    DashboardIconSelected,
    RestaurantMenuIconNotSelected,
    RestaurantMenuIconSelected,
    SettingsIconNotSelected,
    SettingsIconSelected
} from "../assets/icons";
import {signOut} from "firebase/auth";
import {auth} from "../firebase/firebase.ts";
import {useAuth} from "../AuthContext.tsx";


const logout = async () => {
    try {
        await signOut(auth);
        console.log("Logged out successfully!");
    } catch (error) {
        console.error("Logout failed: ", error);
    }
};

function UserHomePage() {

    const {user} = useAuth();

    const [error, setError] = useState<string | null>(null)

    const {representantID} = useParams() as unknown as { representantID: string }
    const [representant, setRepresentant] = useState<RepresentantJson | null>(null)
    const [restaurant, setRestaurant] = useState<RestaurantJson | null>(null)
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState<boolean>(false)

    const mainOptions: MenuOption[] = [
        {
            name: "Dashboard",
            selectedIcon: <DashboardIconSelected/>,
            notSelectedIcon: <DashboardIconNotSelected/>
        },
        {
            name: "Menu do restaurante",
            selectedIcon: <RestaurantMenuIconSelected/>,
            notSelectedIcon: <RestaurantMenuIconNotSelected/>
        },
        {
            name: "Definições",
            selectedIcon: <SettingsIconSelected/>,
            notSelectedIcon: <SettingsIconNotSelected/>
        },
    ]

    const sideOptions: MenuOption[] = [
        {
            name: "Suporte",
            selectedIcon: <div/>,
            notSelectedIcon: <div/>
        },
        {
            name: "Reporte Erros",
            selectedIcon: <div/>,
            notSelectedIcon: <div/>
        },
        {
            name: "Novidades",
            selectedIcon: <div/>,
            notSelectedIcon: <div/>

        }

    ]
    const [currntPage, setCurrntPage] = useState<MenuOption>(mainOptions[0])


    useEffect(() => {

        async function fetch() {
            try {
                const storedRepresentantData = sessionStorage.getItem("User")
                let representantJson: RepresentantJson = storedRepresentantData ? JSON.parse(storedRepresentantData) : null
                if (!storedRepresentantData) {
                    representantJson = await fetchRepresentant({representatID: representantID})
                }
                if (representantJson.id != representantID) {
                    representantJson = await fetchRepresentant({representatID: representantID})
                }

                const storedRestaurantantData = sessionStorage.getItem("Restaurant")
                let restaurantJson: RestaurantJson = storedRestaurantantData ? JSON.parse(storedRestaurantantData) : null
                if (!storedRestaurantantData && representantJson.restaurantID) {
                    restaurantJson = await fetchRestaurant({restaurantID: representantJson.restaurantID})
                }
                setRestaurant(restaurantJson)
                setRepresentant(representantJson)
                sessionStorage.setItem("Restaurant", JSON.stringify(restaurantJson))
                sessionStorage.setItem("User", JSON.stringify(representantJson))
            } catch (error) {
                const errStr = `${error}`
                setError(errStr)
            }
        }

        fetch().then()
    }, []);

    function toggleLeftMenu() {
        setIsLeftMenuOpen(!isLeftMenuOpen)
    }

    function userLogOut() {
        logout().then()
    }

    if (!user) {
        return <Navigate to={`/neemble-eat/auth-error`}/>
    }


    if (!representant || !restaurant) {
        return <div className={`flex justify-center items-center w-full h-dvh`}>

        </div>
    }

    if (error) {
        return <div>
            {error}
        </div>
    }

    return (
        <div>
            {/* Background */}
            <div className='fixed -z-10 bg-gray-100 h-dvh w-full'></div>
            <div
                className={` bg-black ease-in-out transition-opacity duration-300 ${isLeftMenuOpen ? "opacity-[20%] z-20" : "opacity-[0%] -z-50"} w-full h-dvh fixed top-0 left-0 laptop:hidden`}
                onClick={() => setIsLeftMenuOpen(!isLeftMenuOpen)}>
            </div>
            <div className='flex w-full'>
                <div
                    className={`border-r-[1.5px] border-gray-200 z-30 w-3/5 laptop:w-1/5 fixed top-0 left-0 transition-all ease-in-out duration-200 ${isLeftMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <LeftSideBar mainOptions={mainOptions}
                                 sideOptions={sideOptions}
                                 setOption={(option: MenuOption) => setCurrntPage(option)}
                                 current={currntPage}
                    />
                </div>
                {/* h: 56px */}
                {/* w: 56px */}
                <div
                    className={`pt-2 z-10 fixed top-0 right-0 transition-all ease-in-out duration-200 w-full bg-white pl-1 ${isLeftMenuOpen ? " laptop:w-4/5 laptop:pl-0" : "laptop:w-full  laptop:pl-2"}`}>
                    <div className={`w-full h-full`}>
                        <Banner firstName={representant.firstName}
                                lastName={representant.lastName}
                                toggleMenu={toggleLeftMenu}
                                logout={userLogOut}/>
                    </div>

                </div>
                <div
                    className={`pt-[58px] transition-all ease-in-out w-full duration-200 ${isLeftMenuOpen ? "laptop:w-4/5 laptop:ml-[20%] ml-0" : "w-full laptop:ml-2"}`}>
                    <Body currentPage={currntPage}
                          restaurant={restaurant}
                          representant={representant}

                    />
                </div>
            </div>

        </div>
    );
}

export default UserHomePage;