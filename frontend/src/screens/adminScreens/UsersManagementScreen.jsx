import UsersDataTable from "../../components/AdminComponents/UserDataTable";
import AddUser from '../../components/AdminComponents/AdminAddUser'
import { useEffect,useState } from "react"
import { toast } from "react-toastify";
import Pagination from "../../components/AdminComponents/Pagination";
import handleGlobalError from "../GlobalErrorHandler";
import { useNavigate } from "react-router-dom";

import { useGetUsersDataMutation } from "../../slices/adminApiSlice";

import Loader from "../../components/UserComponents/Loader";


const AdminHomeScreen = () => {

  const navigate = useNavigate()

  const [usersData, setUsersData] = useState([]);
  const [render,setRender]=useState(false)
  const [updated,setUpdated] = useState(false)
  const [page,setPage]=useState(1)

  const [usersDataFromAPI, { isLoading } ] = useGetUsersDataMutation();

  useEffect (()=>{
    if(updated===true){
      setRender(true)
    }else if(updated===false){
      setRender(false)
    }
     },[updated])

  useEffect(() => {
    
    try {

      const fetchData = async () => {

        const responseFromApiCall = await usersDataFromAPI({pages: page})
        .then((response)=>handleGlobalError(response,navigate))


        const usersArray = responseFromApiCall.data.usersData;
        
        setUsersData(usersArray);

      };
  
      fetchData();

    } catch (error) {

      toast.error(error);

      console.error("Error fetching users:", error);

    }

  }, [render,page]);

  return (
    <div>
      <h1>Users List</h1>
      <AddUser/>
       <UsersDataTable users={usersData} setUpdated={setUpdated} updated={updated} /> 
          <Pagination setPage={setPage} page={page}/>
      
    </div>
  );
};

export default AdminHomeScreen;
