import {MenuOption} from "../../../interfaces.tsx";
import {Dashboard, EditMenu, Settings, Support, News, Report} from "../index.ts";
import {RepresentantJson, RestaurantJson} from "../../../schema.ts";


interface props {
    currentPage: MenuOption
    restaurant: RestaurantJson
    representant: RepresentantJson

}


function Body({currentPage, restaurant, representant}: props) {
    return (
        <div className='mx-4 h-full'>
            {
                currentPage.name == "Dashboard" &&
                <Dashboard representant={representant}
                           restaurant={restaurant}/>
            }
            {
                currentPage.name == "Menu do restaurante" &&
                <EditMenu restaurant={restaurant}/>
            }
            {
                currentPage.name == "Definições" &&
                <Settings/>
            }
            {
                currentPage.name == "Suporte" &&
                <Support/>
            }
            {
                currentPage.name == "Reporte Erros" &&
                <Report/>
            }
            {
                currentPage.name == "Novidades" &&
                <News/>
            }
        </div>
    );
}

export default Body;