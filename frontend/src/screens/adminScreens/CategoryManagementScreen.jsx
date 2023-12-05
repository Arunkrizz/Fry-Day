import CategoriesDataTable from "../../components/AdminComponents/CategoryDataTable.jsx";
import { useEffect,useState } from "react"
import { toast } from "react-toastify";
import { useGetCategoriesDataMutation } from "../../slices/adminApiSlice";
import Loader from "../../components/UserComponents/Loader";


const CategoryScreen = () => { 

  const [categoriesData, setCategoriesData] = useState([]);
  const [categoriesDataFromAPI, { isLoading } ] = useGetCategoriesDataMutation();

  useEffect(() => {
    
    try {
      const fetchData = async () => {
        const responseFromApiCall = await categoriesDataFromAPI();
        const categoriesArray = responseFromApiCall.data.categoryData;
        setCategoriesData(categoriesArray);
      };
      fetchData();
    } catch (error) {
      toast.error(error);
      console.error("Error fetching categories:", error);
    }

  }, [categoriesDataFromAPI]);

  return (
    <div>
      <h1>Categories List</h1>
      { isLoading ? <Loader/> : <CategoriesDataTable categories={categoriesData} /> }
    </div>
  );
};

export default CategoryScreen;