import { createBrowserRouter } from "react-router-dom";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import HomeChat from "./features/chat/pages/HomeChat";

export const router = createBrowserRouter([
    {path:"/", element:<HomeChat/>},
    {path:"/login", element:<Login/>},
    {path:"/register", element: <Register />}
])