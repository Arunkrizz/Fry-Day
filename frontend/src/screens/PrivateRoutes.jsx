import { Navigate, Outlet } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import { useCheckBlockMutation } from '../slices/userApiSlice';
import { useEffect, useState } from "react";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { logout } from '../slices/authSlice.js';
import { useLogoutMutation } from '../slices/userApiSlice.js';

const PrivateRoutes = () => {

    const [blocked, setBlocked] = useState(false)
    const [blockCheck] = useCheckBlockMutation()
    const { userInfo } = useSelector((state) => state.auth);
    const [logoutApiCall] = useLogoutMutation();
    const navigate = useNavigate()
    const dispatch =useDispatch()

    useEffect(() => {
        const checkBlocked = async() => {
            try {
                // console.log(userInfo,"userInfos");
                const response = await blockCheck({ id: userInfo?.id })
                console.log(response,"chk blk resp pvt");
                if(response.error?.status===401){
                    await logoutApiCall().unwrap();
                    dispatch(logout())
                    navigate('/login')
                }
                if (response.data?.is_blocked) {
                    setBlocked(true)
                    // Show a toast notification when the user is blocked
                    toast.error("Your account is blocked");
                }
            } catch (error) {
                console.log(error,"kkkkkkkkk")
            }
        } 
        checkBlocked()
    }, [blockCheck, userInfo])

    return !blocked && userInfo ? <Outlet/> : (
        !blocked ? <Navigate to='/login' replace /> : "User Blocked By Admin")

}

export default PrivateRoutes;