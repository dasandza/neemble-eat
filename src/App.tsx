import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Menu, Product, Cart, Orders, LogIn, SignUp, MainPage, AccountSetUp} from './Pages'

function App() {


    // THE APP IS NOT WORKING BECAUSE OF THE API, IF NOTHING WORKS, PASTE IT INTO THE FIREBASE.TS FILE FODASE (IT IS IN THE .ENV FILE)
    // UPDATE: THE APU KEY IS VULNERABLE, ANY ONE CAN SEE IT AND THATS SMOKE TO THE GANG. NEXT TASK: HIDE THIS SHIT
    // NOTE: MAKE SURE TO DELETE THESE COMMENTS BEFORE PUSHING IT INTO GITHUB
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/neemble-eat/b/:encodedPlaceName/:tableNumber"
                           element={<Menu/>}/>
                    <Route path="/neemble-eat/"
                           element={<MainPage/>}/>
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
                </Routes>
            </Router>
        </div>
    )
}

export default App
