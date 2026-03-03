import { Home } from "../components/pages/Home";
import { Profile } from "../components/pages/Profile";
import { Setting } from "../components/pages/Setting";
import { UserManagement } from "../components/pages/userManagement";

export const homeRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: "user_management",
        element: <UserManagement />
    },
    {
        path: "setting",
        element: <Setting />
    },
    {
        path: "profile",
        element: <Profile />
    }
]