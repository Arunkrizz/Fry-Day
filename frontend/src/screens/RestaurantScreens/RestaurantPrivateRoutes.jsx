import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const RestaurantPrivateRoutes = () => {

    const { hotelInfo } = useSelector((state) => state.hotelAuth);

   

    return hotelInfo ? <Outlet/> : <Navigate to='/hotel' replace />

}

export default RestaurantPrivateRoutes;