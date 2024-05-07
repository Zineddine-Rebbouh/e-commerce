import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectRoute = ( { children } ) => {
    const { isAuthenticated } = useSelector( state => state.user )
    if ( !isAuthenticated )
    {
        return <Navigate to="/sign-in" />
    }
    return children
}

export default ProtectRoute
