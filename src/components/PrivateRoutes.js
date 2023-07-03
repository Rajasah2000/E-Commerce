import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";


const PrivateRoutes = () => {
    const auth = reactLocalStorage.getObject('adminData');
    // const {loginStatus} = useUserApi()

    // console.log("LOGINS" , loginStatus);
  return (
    auth?.loginStatus ? <Outlet/> : <Navigate to={'/'}/>  )
}

export default PrivateRoutes