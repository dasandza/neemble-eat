import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Menu, Placeholder, Product, Cart, Orders, LogIn, SignUp} from './Pages'

function App() {

    return (

        <Router>
            <Routes>
                <Route path="/neemble-eat/b/:encodedPlaceName/:tableNumber"
                       element={<Menu/>}/>
                <Route path="/neemble-eat/"
                       element={<Placeholder/>}/>
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

            </Routes>
        </Router>
    )
}

export default App
