import React, {useState,useEffect} from 'react'
import AddProduct from '../../components/RestaurantComponents/AddProduct'
import AddPost from '../../components/RestaurantComponents/AddPost';
import SideBar from '../../components/RestaurantComponents/SideBar';
import RestaurantSideBar from '../../components/RestaurantComponents/RestaurantSideBar'
import Map from '../../components/RestaurantComponents/Map';
import RestaurantList from '../../components/RestaurantComponents/RestaurantList.JSX';
import MapRestaurant from '../../components/RestaurantComponents/MapRestaurant';
import { useLocation } from 'react-router-dom';
import OrderUpdates from './OrderUpdates'

// import { useHistory } from 'react-router-dom';


function Homescreen() {
   // Get the current pathname from the window location
   const currentPath = window.location.pathname;
   const [location,setLocation]= useState(window.location.pathname)
  const [component,setComponent]=useState('')
  const [restaurantPosition, setRestaurantPosition] = useState(null);

  const locations = useLocation()


  // const onClickHandler_ = (location) => {

  //   setRestaurantPosition(location);
  //   console.log("set res pos ",restaurantPosition);

  //   function haversineDistance(lat1, lon1, lat2, lon2) {
  //     // Radius of the Earth in kilometers
  //     var R = 6371;
  
  //     // Convert latitude and longitude from degrees to radians
  //     var dLat = (lat2 - lat1) * (Math.PI / 180);
  //     var dLon = (lon2 - lon1) * (Math.PI / 180);
  
  //     var a =
  //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //         Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
  //         Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  //     // Distance in kilometers
  //     var distance = R * c;
  
  //     return distance;
  // }
  
  // // Example coordinates for a reference point (e.g., your location)
  // var referenceLatitude = 40.7128;
  // var referenceLongitude = -74.0060;
  
  // // Example coordinates for the location to check
  // var checkLatitude = 40.7306;
  // var checkLongitude = -73.935242;
  
  // // Set a threshold distance (in kilometers) for what you consider "near"
  // var thresholdDistance = 10; // Adjust as needed
  
  // // Calculate the distance between the two points
  // // var distance = haversineDistance(referenceLatitude, referenceLongitude, checkLatitude, checkLongitude);
  // var distance = haversineDistance(userPosition.lat, userPosition.lng, 9.9185, 76.2558);

  
  // // Check if the distance is within the threshold
  // if (distance <= thresholdDistance) {
  //     console.log(distance,'The location is near.');
  // } else {
  //     console.log(distance,'The location is not near.');
  // }
  
  // };

  // // const apikey = 'agtxtV1U5cHR0CyPXPKSkQEKnELuWU97-SVp2oCym9k'

  // const userPosition = { lat: 64.1472, lng: -21.9398 };

  const restaurantList = [
    {
      name: "The Fish Market",
      location: { lat: 64.1508, lng: -21.9536 },
    },
    {
      name: "Bæjarins Beztu Pylsur",
      location: { lat: 64.1502, lng: -21.9519 },
    },
    {
      name: "Grillmarkadurinn",
      location: { lat: 64.1475, lng: -21.9347 },
    },
    {
      name: "Kol Restaurant",
      location: { lat: 64.1494, lng: -21.9337 },
    },
  ];
  

  useEffect(() => {
    const handleBackButton = () => {
      // Do something when the back button is pressed
      setLocation(window.location.pathname)
    };

    handleBackButton();
    
 
  }, [locations]);




  useEffect(()=>{
    const renderComponent = () => {
      if (location === '/hotel/home/addProduct') {
        return <AddProduct />;
      } else if(location === '/hotel/home'){
         return <OrderUpdates/>
      }else if(location === '/hotel/home/addPost'){
        return <AddPost />
     }else if(location === '/hotel/home/map'){
      return<>
      <RestaurantList list={restaurantList} onClickHandler={onClickHandler_} />
      <Map
        userPosition={userPosition}
        restaurantPosition={restaurantPosition}
      />
      </>
       
     }
     else if(location === '/hotel/home/Resmap'){
      return<>
     <MapRestaurant/>
      </>
       
     } else {
        return <div>Invalid URL</div>;
      }
    }
    setComponent(renderComponent())
  },[location,restaurantPosition])

  

   
   // Based on the currentPath, render different components
  //  const renderComponent = () => {
  //    if (location === '/hotel/home/addProduct') {
  //      return <AddProduct />;
  //    } else if(location === '/hotel/home'){
  //       return <div>Homepage</div>
  //    } else {
  //      return <div>Invalid URL</div>;
  //    }
  //  }
  return (
    <div style={{ display: 'flex' }}>
      {/* <SideBar setLocation={setLocation} style={{ flex: 1 }}/> */}
     < RestaurantSideBar  setLocation={setLocation}/>
      {component}
    </div>

  )
}

export default Homescreen