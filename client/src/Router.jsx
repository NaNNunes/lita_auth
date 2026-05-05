import {createBrowserRouter} from "react-router-dom";

import App from "./App";
import Registration from "./pages/Registration";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children : [
            {
                path: "/registration",
                element: <Registration/>
            },
            {
                path: "login",
                element: <Login/>
            }
        ]
    }
])

export default router;