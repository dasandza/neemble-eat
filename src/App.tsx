import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Menu, Placeholder, Product, Cart, Orders} from './Pages'

function App() {


    return (
        <div className="w-full overflow-hidden">
            <Router>
                <Routes>
                    <Route path="/b/:encodedPlaceName/:tableNumber"
                           element={<Menu/>}/>
                    <Route path="/"
                           element={<Placeholder/>}/>
                    <Route path="/p/:encodedBusinessName/:tableNumber/:productId"
                           element={<Product/>}/>
                    <Route path='/c/:encodedBusinessName/:tableNumber'
                           element={<Cart/>}/>
                    <Route path="/o/:encodedBusinessName/:tableNumber"
                           element={<Orders/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
