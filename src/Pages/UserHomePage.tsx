import {useParams} from "react-router-dom";
import {useState} from "react";
import {
    Banner,
    LeftSideBar,
    Body,
    Dashboard,
    EditMenu,
    Settings,
    Support,
    Report,
    News
} from "../Components/UserHomePage";
import {MenuOption} from "../interfaces.tsx";
import {
    useRepresentantData,
    useRestaurantData
} from "../api";
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
import Loading from "./LoadingPages/Loading.tsx";
import LoadingUserPage from "./LoadingPages/pages/LoadingUserPage.tsx";
import Background from "../Components/ui/Background.tsx";
import {UserPageContext} from "../context/userPageContext.ts";


const logout = async () => {
    try {
        await signOut(auth);
        console.log("Logged out successfully!");
    } catch (error) {
        console.error("Logout failed: ", error);
    }
};

function UserHomePage() {


    const {representantID} = useParams() as unknown as { representantID: string }
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState<boolean>(false)


    const mainOptions: MenuOption[] = [
        {
            name: "Dashboard",
            element: <Dashboard/>,
            selectedIcon: <DashboardIconSelected/>,
            notSelectedIcon: <DashboardIconNotSelected/>
        },
        {
            name: "Menu do restaurante",
            element: <EditMenu/>,
            selectedIcon: <RestaurantMenuIconSelected/>,
            notSelectedIcon: <RestaurantMenuIconNotSelected/>
        },
        {
            name: "Definições",
            element: <Settings/>,
            selectedIcon: <SettingsIconSelected/>,
            notSelectedIcon: <SettingsIconNotSelected/>
        },
    ]

    const sideOptions: MenuOption[] = [
        {
            name: "Suporte",
            element: <Support/>,
            selectedIcon: <div/>,
            notSelectedIcon: <div/>
        },
        {
            name: "Reporte Erros",
            element: <Report/>,
            selectedIcon: <div/>,
            notSelectedIcon: <div/>
        },
        {
            name: "Novidades",
            element: <News/>,
            selectedIcon: <div/>,
            notSelectedIcon: <div/>

        }

    ]
    const [currentPage, setCurrentPage] = useState<MenuOption>(mainOptions[0])

    const {representant, isRepresentantLoading} = useRepresentantData({representatID: representantID})

    const {
        restaurant,
        isRestaurantLoading,
    } = useRestaurantData({restaurantID: representant ? representant.restaurantID ? representant.restaurantID : null : null})


    function toggleLeftMenu() {
        setIsLeftMenuOpen(!isLeftMenuOpen)
    }

    function userLogOut() {
        logout().then()
    }

    if (!restaurant || !representant) {
        return <div></div>
    }

    return (
        <UserPageContext.Provider value={{
            restaurant: restaurant,
            representant: representant
        }}>
            <Loading LoadingPage={LoadingUserPage} loadingParams={[isRestaurantLoading, isRepresentantLoading]}>
                <Background color={`bg-gray-100`}>
                    <div>
                        <div
                            className={` bg-black ease-in-out transition-opacity duration-300 ${isLeftMenuOpen ? "opacity-[20%] z-20" : "opacity-[0%] -z-50"} w-full h-dvh fixed top-0 left-0 laptop:hidden`}
                            onClick={() => setIsLeftMenuOpen(!isLeftMenuOpen)}>
                        </div>
                        <div className='flex w-full'>
                            <div
                                className={`border-r-[1.5px] border-gray-200 z-30 w-3/5 laptop:w-1/5 fixed top-0 left-0 transition-all ease-in-out duration-200 ${isLeftMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                                <LeftSideBar mainOptions={mainOptions}
                                             sideOptions={sideOptions}
                                             setOption={(option: MenuOption) => setCurrentPage(option)}
                                             current={currentPage}/>
                            </div>
                            {/* h: 56px */}
                            {/* w: 56px */}
                            <div
                                className={`pt-2 z-10 fixed top-0 right-0 transition-all ease-in-out duration-200 w-full bg-white ${isLeftMenuOpen ? " laptop:w-4/5" : "laptop:w-full"}`}>
                                <div className={`w-full h-full`}>
                                    <Banner toggleMenu={toggleLeftMenu}
                                            logout={userLogOut}/>
                                </div>
                            </div>
                            <div
                                className={`pt-[58px] transition-all ease-in-out w-full duration-200 ${isLeftMenuOpen ? "laptop:w-4/5 laptop:ml-[20%]" : "w-full"}`}>
                                <Body currentPage={currentPage.element}/>
                            </div>
                        </div>

                    </div>
                </Background>
            </Loading>
        </UserPageContext.Provider>
    );
}

export default UserHomePage;