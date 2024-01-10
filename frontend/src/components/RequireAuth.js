import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import checkBanned from "../components/checkForBan";
import checkNotification from "../components/checkNotification";
import { logout } from "../actions/userActions";

function RequireAuth (){
    const dispatch = useDispatch();
    const location = useLocation();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    if(userInfo)
    { 
        console.log("req auth")
        const { userInfo } = userLogin;
        checkBanned(userInfo);
        if(!localStorage.getItem("notification"))
        checkNotification(userInfo);
        const getBanned = localStorage.getItem("isBanned")
        if(getBanned)
        {
            console.log("banned")
            localStorage.clear()
            console.log(localStorage)
            dispatch(logout());
            return <Navigate to="/banned" state={{ from: location }} replace />
        }
        else if (userInfo)
        {
            return <Outlet/>
        } 
    }
    else
        {
            console.log("unauthorized")
            return <Navigate to="/unauthorized" state={{ from: location }} replace /> 
        }
}

export default RequireAuth;