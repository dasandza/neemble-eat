import {MenuOption} from "../../../interfaces.tsx";
import {Dashboard, Menu, Settings, Support, News, Report} from "../index.ts";
import {RepresentantJson, RestaurantJson} from "../../../schema.ts";


interface props {
    currentPage: MenuOption
    restaurant: RestaurantJson
    representant: RepresentantJson

}


function Body({currentPage, restaurant, representant}: props) {
    return (
        <div className='p-4'>
            {
                currentPage.name == "Dashboard" &&
                <Dashboard representant={representant}
                           restaurant={restaurant}/>
            }
            {
                currentPage.name == "Menu do restaurante" &&
                <Menu restaurant={restaurant}/>
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