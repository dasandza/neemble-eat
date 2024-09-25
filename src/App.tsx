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
import Menu from "./Pages/Menu.tsx";
import Test from "./Pages/Test.tsx";
import AuthError from "./Pages/AuthError.tsx";
import {ReactElement} from "react";
import AuthVerification from "./firebase/AuthVerification.tsx";


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

    const prefix = "/neemble-eat"

    const routes: {
        path: string,
        element: ReactElement,
        requiresAuth: boolean,
    }[] =
        [
            {
                path: "/",
                element: <Home menuOptions={menuOptions}/>,
                requiresAuth: false
            },
            {
                path: "/about-us",
                element: <About menuOptions={menuOptions}/>,
                requiresAuth: false
            },
            {
                path: "/demo",
                element: <Demo menuOptions={menuOptions}/>,
                requiresAuth: false
            },
            {
                path: "/contact",
                element: <Contact menuOptions={menuOptions}/>,
                requiresAuth: false
            },
            {
                path: "/support",
                element: <Support menuOptions={menuOptions}/>,
                requiresAuth: false
            },
            {
                path: '/c/:restaurantID/:menuID/:tableNumber',
                element: <Cart/>,
                requiresAuth: false
            },
            {
                path: "/o/:restaurantID/:menuID/:tableNumber",
                element: <Orders/>,
                requiresAuth: false
            },
            {
                path: "/login",
                element: <LogIn/>,
                requiresAuth: false
            },
            {
                path: "/signup",
                element: <SignUp/>,
                requiresAuth: false
            },
            {
                path: "/setup/:representantID/:name",
                element: <AccountSetUp/>,
                requiresAuth: true
            },
            {
                path: "/orders/:restaurantID",
                element: <OrdersInterface/>,
                requiresAuth: true
            },
            {
                path: "/sessions/:restaurantID",
                element: <SessionsInterface/>,
                requiresAuth: true
            },
            {
                path: "/user/rep/:representantID",
                element: <UserHomePage/>,
                requiresAuth: true
            },
            {
                path: "/menu/:restaurantID/:menuID/:tableNumber",
                element: <Menu/>,
                requiresAuth: false
            },
            {
                path: "/test",
                element: <Test/>,
                requiresAuth: false
            },
            {
                path: "/auth-error",
                element: <AuthError/>,
                requiresAuth: false
            }
        ]

    return (
        <div className="App">
            <Router>
                <Routes>
                    {routes.map((route) => {
                        const {path, element, requiresAuth} = route;
                        const fullPath = `${prefix}${path}`;

                        return (
                            <Route
                                key={fullPath}
                                path={fullPath}
                                element={requiresAuth ? <AuthVerification>{element}</AuthVerification> : element}
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    )
}

export default App
