import HotelsDataTable from "../../components/AdminComponents/HotelsDataTable";
import { useEffect,useState } from "react"
import { toast } from "react-toastify";

import { useGetHotelDataMutation } from "../../slices/adminApiSlice";

import Loader from "../../components/UserComponents/Loader";
import Pagination from "../../components/AdminComponents/Pagination";
import handleGlobalError from "../GlobalErrorHandler";
import { useNavigate } from "react-router-dom";

const AdminHomeScreen = () => {
  const navigate = useNavigate()
  const [hotelData, setHotelData] = useState([]);
  const [updated,setUpdated] = useState(false)
  const [reRender,setRerender] = useState(false)
  const [page,setPage]=useState(1)

  const [hotelDataFromAPI, { isLoading } ] = useGetHotelDataMutation();

 useEffect (()=>{
if(updated===true){
  setRerender(true)
}else if(updated===false){
  setRerender(false)
}
 },[updated])

  useEffect(() => {
    
    try {

      const fetchData = async () => {

        const responseFromApiCall = await hotelDataFromAPI({pages: page})
        .then((response)=>handleGlobalError(response,navigate))

        const usersArray = responseFromApiCall.data.hotelsData;
        
        setHotelData(usersArray);

      };
  
      fetchData();

    } catch (error) {

      toast.error(error);

      console.error("Error fetching users:", error);

    }

  }, [reRender,page]);

  return (
    <div>
      <h1>Restaurant List</h1>
      { isLoading ? <Loader/> :<>
      <HotelsDataTable hotels={hotelData} updated ={updated} setUpdated={setUpdated}  /> 
      <Pagination setPage={setPage} page={page}/>
      </> }
    </div>
  );
};

export default AdminHomeScreen;
