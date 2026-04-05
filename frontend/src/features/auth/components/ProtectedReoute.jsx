import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedReoute = () => {

    const { user, loading } = useSelector((state)=> state.auth)

    if(loading){
        return <div><h1>Checking authentication...</h1></div>
    }

    if(!user){
        return <Navigate to="/auth/signin" replace/>
    }

  return <Outlet />
}

export default ProtectedReoute