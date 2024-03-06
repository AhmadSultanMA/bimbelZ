import React from 'react'
import reactDom from 'react-dom';
import { Route, Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
    const user = {loggedIn : localStorage.getItem('role') == 'admin'}
    return user && user.loggedIn
}

const ProtectedAdmin = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <Navigate to="/home" />
}

export default ProtectedAdmin