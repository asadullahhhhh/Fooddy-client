import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/ContextProvider';

const Private = ({children}) => {

    const {user, loading} = use(AuthContext)
    const location = useLocation()

    if(loading) <div>Loaging...</div>

    if(!user) <Navigate to={'/login'} state={location.pathname}></Navigate>

    return children
};

export default Private;