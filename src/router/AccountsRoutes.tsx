import { Login } from "../components/pages/Login";
import { Register } from "../components/pages/Register";

export const accountsRoutes = [
    {
        path: "login",
        element: <Login />
    },
    {
         path: "register",
         element: <Register />
    }
]