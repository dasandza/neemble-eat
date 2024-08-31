import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {
    Cart,
    Orders,
    LogIn,
    SignUp,
    Home,
    AccountSetUp,
    OrdersInterface,
    About,
    Demo,
    Contact,
    Support,
    SessionsInterface, UserHomePage
} from './Pages'
import {CharmCross} from "./assets/icons";
import NewMenu from "./Pages/NewMenu.tsx";
import Test from "./Pages/Test.tsx";
import AuthError from "./Pages/AuthError.tsx";


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


    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/neemble-eat/"
                           element={<Home menuOptions={menuOptions}/>}/>
                    <Route path="/neemble-eat/about-us"
                           element={<About menuOptions={menuOptions}/>}/>
                    <Route path="/neemble-eat/demo"
                           element={<Demo menuOptions={menuOptions}/>}/>
                    <Route path="/neemble-eat/contact"
                           element={<Contact menuOptions={menuOptions}/>}/>
                    <Route path="/neemble-eat/support"
                           element={<Support menuOptions={menuOptions}/>}/>
                    <Route path='/neemble-eat/c/:restaurantID/:menuID/:tableNumber'
                           element={<Cart/>}/>
                    <Route path="/neemble-eat/o/:restaurantID/:menuID/:tableNumber"
                           element={<Orders/>}/>
                    <Route path="/neemble-eat/login"
                           element={<LogIn/>}/>
                    <Route path="/neemble-eat/signup"
                           element={<SignUp/>}/>
                    <Route path="/neemble-eat/setup/:representantID/:name"
                           element={<AccountSetUp/>}/>
                    <Route path="/neemble-eat/orders/:restaurantID"
                           element={<OrdersInterface/>}/>
                    <Route path="/neemble-eat/sessions/:restaurantID"
                           element={<SessionsInterface/>}/>
                    <Route path="/neemble-eat/user/rep/:representantID"
                           element={<UserHomePage/>}/>
                    <Route path="/neemble-eat/menu/:restaurantID/:menuID/:tableNumber"
                           element={<NewMenu/>}/>
                    <Route path="/neemble-eat/test"
                           element={<Test/>}/>
                    <Route path="/neemble-eat/auth-error"
                           element={<AuthError/>}/>

                </Routes>
            </Router>
        </div>
    )
}

export default App
