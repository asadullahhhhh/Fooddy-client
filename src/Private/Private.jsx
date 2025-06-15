import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/ContextProvider';
import Loading from '../Shared/Loading/Loading';

const Private = ({children}) => {

    const {user, loading} = use(AuthContext)
    const location = useLocation()

    if(loading) return <Loading></Loading>

    if(!user) return <Navigate to={'/login'} state={location.pathname}></Navigate>

    return children
};

export default Private;