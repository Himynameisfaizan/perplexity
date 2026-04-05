import { createBrowserRouter } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import HomeChat from "../features/chat/pages/HomeChat";
import ProtectedReoute from "../features/auth/components/ProtectedReoute";

export const router = createBrowserRouter([

    {
        element:<ProtectedReoute/> ,
        children:[
            {
                path: "/",
                element: <HomeChat />,
            }
        ]
    },
    {
        path:"/auth/signin",
         element:<Login/>
        },
    {
        path:"/auth/signup", 
        element: <Register />
    }
    
])