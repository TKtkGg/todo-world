import { Home } from "../components/pages/Home";
import { Profile } from "../components/pages/Profile";
import { Setting } from "../components/pages/Setting";
import { TodoList } from "../components/pages/TodoList";
import { UserManagement } from "../components/pages/userManagement";
import { UserDetail } from "../components/pages/UserDetail";

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
        path: "user_management/:userId",
        element: <UserDetail />
    },
    {
        path: "setting",
        element: <Setting />
    },
    {
        path: "profile",
        element: <Profile />
    },
    {
        path: "todo_list",
        element: <TodoList />
    },
    
]