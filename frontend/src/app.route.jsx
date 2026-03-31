import { createBrowserRouter } from "react-router-dom";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

export const router = createBrowserRouter([
    {path:"/login", element:<Login/>},
    {path:"/register", element: <Register />}
])