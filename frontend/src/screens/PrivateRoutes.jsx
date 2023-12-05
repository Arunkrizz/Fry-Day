import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCheckBlockMutation } from '../slices/userApiSlice';
import { useEffect, useState } from "react";
import {toast} from 'react-toastify'

const PrivateRoutes = () => {

    const [blocked, setBlocked] = useState(false)
    const [blockCheck] = useCheckBlockMutation()
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        const checkBlocked = async() => {
            try {
                // console.log(userInfo,"userInfos");
                const response = await blockCheck({ id: userInfo.id })
                if (response.data.is_blocked) {
                    setBlocked(true)
                    // Show a toast notification when the user is blocked
                    toast.error("Your account is blocked");
                }
            } catch (error) {
                console.log(error)
            }
        } 
        checkBlocked()
    }, [blockCheck, userInfo])

    return !blocked && userInfo ? <Outlet/> : (
        !blocked ? <Navigate to='/login' replace /> : "User Blocked By Admin")

}

export default PrivateRoutes;