import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {
    Menu,
    Product,
    Cart,
    Orders,
    LogIn,
    SignUp,
    MainPage,
    AccountSetUp,
    OrdersInterface,
    About,
    Demo,
    Contact,
    Support,
    SessionsInterface, UserHomePage
} from './Pages'
import {CharmCross} from "./assets/icons";

function App() {


    const menuOptions = [
        {
            name: "Sobre",
            path: "/neemble-eat/about-us",
            icon: <><CharmCross/></>
        },
        {
            name: "Demo",
            path: "/neemble-eat/demo",
            icon: <><CharmCross/></>
        },
        {
            name: "Contacto",
            path: "/neemble-eat/contact",
            icon: <><CharmCross/></>
        },
        {
            name: "Suporte",
            path: "/neemble-eat/support",
            icon: <CharmCross/>
        },
    ]

    // THE APP IS NOT WORKING BECAUSE OF THE API, IF NOTHING WORKS, PASTE IT INTO THE FIREBASE.TS FILE FODASE (IT IS IN THE .ENV FILE)
    // UPDATE: THE APU KEY IS VULNERABLE, ANY ONE CAN SEE IT AND THAT'S SMOKE TO THE GANG. NEXT TASK: HIDE THIS SHIT
    // NOTE: MAKE SURE TO DELETE THESE COMMENTS BEFORE PUSHING IT INTO GITHUB

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/neemble-eat/b/:encodedPlaceName/:tableNumber"
                           element={<Menu/>}/>
                    <Route path="/neemble-eat/"
                           element={<MainPage menuOptions={menuOptions}/>}/>
                    <Route path="/neemble-eat/about-us"
                           element={<About menuOptions={menuOptions}/>}/>
                    <Route path="/neemble-eat/demo"
                           element={<Demo menuOptions={menuOptions}/>}/>
                    <Route path="/neemble-eat/contact"
                           element={<Contact menuOptions={menuOptions}/>}/>
                    <Route path="/neemble-eat/support"
                           element={<Support menuOptions={menuOptions}/>}/>
                    <Route path="/neemble-eat/p/:encodedBusinessName/:tableNumber/:productId"
                           element={<Product/>}/>
                    <Route path='/neemble-eat/c/:encodedBusinessName/:tableNumber'
                           element={<Cart/>}/>
                    <Route path="/neemble-eat/o/:encodedBusinessName/:tableNumber"
                           element={<Orders/>}/>
                    <Route path="/neemble-eat/login"
                           element={<LogIn/>}/>
                    <Route path="/neemble-eat/signup"
                           element={<SignUp/>}/>
                    <Route path="/neemble-eat/setup/:recordID/:name"
                           element={<AccountSetUp/>}/>
                    <Route path="/neemble-eat/orders"
                           element={<OrdersInterface/>}/>
                    <Route path="/neemble-eat/sessions"
                           element={<SessionsInterface/>}/>
                    <Route path="/neemble-eat/user/rep/:representantID"
                           element={<UserHomePage/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
