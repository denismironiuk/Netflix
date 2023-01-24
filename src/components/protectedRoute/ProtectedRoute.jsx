import React from 'react'
import { Navigate } from 'react-router-dom'
import {UserAuth} from '../../context/AuhtContext'

function ProtectedRoute({children}) {
    const {user}=UserAuth()

    if(user){
        return children
    }
    else{
        return <Navigate to={'/'}/>
    }
}

export default ProtectedRoute