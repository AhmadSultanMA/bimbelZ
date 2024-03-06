import React from 'react'
import reactDom from 'react-dom';
import { Route, Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
    const user = {loggedIn : !localStorage.getItem('name')}
    return user && user.loggedIn
}

const ProtectedLogin = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <Navigate to="/home" />
}

export default ProtectedLogin