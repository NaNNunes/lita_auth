import {createBrowserRouter} from "react-router-dom";

import App from "./App";
import MemberForm from "./pages/MemberForm";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children : [
            {
                path: "/registration",
                element: <MemberForm/>
            },
            {
                path: "/member/:memberEnrollment",
                element: <MemberForm/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/home",
                element: <Home/>
            }
        ]
    }
])

export default router;