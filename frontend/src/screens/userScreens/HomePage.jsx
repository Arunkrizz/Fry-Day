import React, { useEffect, useState } from 'react'
// import SideBar from '../../components/UserComponents/SideBar'
import PostCard from '../../components/UserComponents/PostCard'
import { useGetUserPostsMutation } from '../../slices/userApiSlice'
import Loader from "../../components/UserComponents/Loader";
// import UserSideBar from "../../components/UserComponents/UserSideBar"
import RestaurantHeroHeader from '../../components/UserComponents/RestaurantHeroHeader'
import RestaurantProfile from './RestaurantProfile';
import { useNavigate,useLocation } from 'react-router-dom';
import RestaurantLocation from '../../components/UserComponents/RestaurantLocation'
import { useSelector } from 'react-redux';
import { useGetHotelLocationMutation } from '../../slices/userApiSlice';
import { useCheckBlockMutation } from '../../slices/userApiSlice';
import LiveStreaming from '../../components/UserComponents/viewRestaurantLive'
import {toast} from 'react-toastify'

function HomePage() {
  const [fetchHotelLocation] = useGetHotelLocationMutation()
  const { viewHotel } = useSelector( (state) => state.viewHotel);
  // console.log(viewHotel,"homepage view hotel")
  const [restaurantLocation,setRestaurantLocation] = useState('')

  const [blocked, setBlocked] = useState(false)
    const [blockCheck] = useCheckBlockMutation()
    const { userInfo } = useSelector((state) => state.auth);

  const [getPosts] = useGetUserPostsMutation()
  const [post, setPost] = useState('')
  const [location, setLocation] = useState(window.location.pathname)
  const [component,setComponent]=useState('')

  const locations = useLocation()
  

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
}, [blockCheck, userInfo,location])


  useEffect(() => {
    const handleBackButton = () => {
      // Do something when the back button is pressed
      console.log(window.location.pathname,"locations");
      setLocation(window.location.pathname)
    };

    handleBackButton();
    
 
  }, [locations]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFromApiCall = await getPosts();
        setPost(responseFromApiCall.data.Post)
        //    console.log(responseFromApiCall,"resss view post")
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function
  }, []); // Include dependencies if necessary


  useEffect(() => {
    const renderComponent = () => {

     if(!blocked){
       if (location === '/user/home/restaurant') {
        return <RestaurantProfile setLocation={setLocation} />;
      } else if (location === '/user/home') {
        return <div style={{ marginLeft: '20px', marginTop: '20px' }}>
          {post ? post.map((post) => (<PostCard key={post._id} post={post} setLocation={setLocation} />)) : <Loader />}
        </div>;
      } else if (location === '/user/home/viewHotelLocation') {
        return <RestaurantLocation location ={restaurantLocation}/>;
      }
      if (location === '/user/home/live') {
        return <LiveStreaming/> ;
      } else {
        return <div>Invalid URL</div>;
      }}else{
        return "User Blocked"
      }
    }
    setComponent(renderComponent())
  }, [location,post,restaurantLocation,blocked])

  
useEffect(()=>{
  const fetchLocation = async () => {
    try {
      const responseFromApiCall = await fetchHotelLocation({...viewHotel})
      // console.log(responseFromApiCall,"loctn")
      if(responseFromApiCall){
        setRestaurantLocation (responseFromApiCall.data)
      }
     
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }
  };

  fetchLocation(); // Call the async function
},[viewHotel])

  return (


    <div>

  {component}

    </div>
  )
}



export default HomePage