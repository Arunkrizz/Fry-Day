import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap'
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
//   import { useGetUsersDataMutation } from "../../slices/adminApiSlice";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../slices/viewHotelSlice'
import { useGetHotelDetailsMutation } from '../../slices/userApiSlice';



const SearchDrawer = () => {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const [restaurantsData, setRestaurantsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    //   const { userInfo } = useSelector((state) => state.auth);
    const { hotelInfo } = useSelector((state) => state.hotelAuth);

    const navigate = useNavigate()

    //   const [usersDataFromAPI] = useGetUsersDataMutation();
    const HOTEL_IMAGE_DIR_PATH = 'http://localhost:5000/restaurantImages/'

    const VITE_PROFILE_IMAGE_DIR_PATH = HOTEL_IMAGE_DIR_PATH

    const [fetchHotelData] = useGetHotelDetailsMutation()

    const  fetchHotel = async(id)=>{
        try {
          // console.log("hotel");
          const responseFromApiCall = await fetchHotelData({id:id})
          // console.log(responseFromApiCall,"hotel details")
          dispatch( setCredentials(responseFromApiCall.data) );
        } catch (error) {
          
        }
       }

       const viewHotelHandler = async (id) => {

        try {
    
          await fetchHotel(id)
        
          navigate( '/user/home/restaurant' );
    
          
    
        } catch (err) {
    
          console.log( err,"viewhotelHandler" );
    
        }
    
      }

    const fetchData = async () => {
        try {
            setIsLoading(true);
            //   const responseFromApiCall = await usersDataFromAPI();
            const responseFromApiCall = await axios.post('/api/users/fetchRestaurantDatas')
            console.log(responseFromApiCall, "resfrom api hottteel");
            const restaurantArray = responseFromApiCall.data;
            console.log('restaurantArray', restaurantArray);
            setRestaurantsData(restaurantArray);
        } catch (error) {
            toast.error(error);
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRestaurants = restaurantsData?.filter(
        (restaurant) =>
            restaurant.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Button
                ref={btnRef}
                style={{
                    width: '200px',
                    backgroundColor: 'white',
                    textAlign: 'left',
                    color: 'black',
                    border: 'none',
                }}
                colorscheme='teal'
                onClick={() => {
                    fetchData();
                    onOpen();
                }}
            >
                Search...
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Search Restaurant</DrawerHeader>

                    <DrawerBody>
                        <Input
                            placeholder='Type here...'
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <>
                                {searchQuery && filteredRestaurants.length > 0 ? (
                                    <div style={{ cursor: 'pointer' }}>
                                        {filteredRestaurants.map((hotel) => (
                                            <div
                                                className='p-2'
                                                key={hotel._id}
                                                style={{ display: 'flex', alignItems: 'center' }}
                                                onClick={async () => {
                                                    onClose();
                                                    setSearchQuery('');
                                                    viewHotelHandler(hotel._id)
                                                    console.log(hotel._id,"hotel clicked")
                                                    // hotelInfo._id === user._id
                                                    //   ? navigate('/profile')
                                                    //   :

                                                    navigate(`/user/home/restaurant`);
                                                }}
                                            >
                                                <img
                                                    src={
                                                        hotel.restaurantImages[0]
                                                            ? `${VITE_PROFILE_IMAGE_DIR_PATH}${hotel.restaurantImages[0]}`
                                                            : ``
                                                    }
                                                    alt={hotel.restaurantName}
                                                    style={{
                                                        width: '30px',
                                                        height: '30px',
                                                        borderRadius: '50%',
                                                        marginRight: '10px',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                                <p style={{ marginBottom: '0' }}>{hotel.restaurantName}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default SearchDrawer
