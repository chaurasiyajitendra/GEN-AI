import React from 'react'
import { useAuth } from '../hooks/useAuth'
import Loader from '../pages/Loader';
import { Navigate } from 'react-router';

const Protect = ({children}) => {

    const {loading,user} = useAuth();

    if(loading)
    {
        return(<Loader />)
    }

    if(!user)
    {
       return <Navigate to={'/login'} />
    }
  return children
}

export default Protect