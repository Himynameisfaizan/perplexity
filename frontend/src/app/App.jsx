import { RouterProvider } from "react-router-dom"
import {router} from "./app.route.jsx";
import "./App.scss"
import { useAuth } from "../features/auth/hooks/useAuth.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";


function App() {

  const { handleGetMe } = useAuth()
  const { user, loading } = useSelector((state)=> state.auth)

  useEffect(()=>{
    handleGetMe();
  },[])

  if(loading){
    return <div><h1>Loading...</h1></div>
  }

  return (
   <>
   <RouterProvider router={router}></RouterProvider>
   </>
  )
}

export default App
