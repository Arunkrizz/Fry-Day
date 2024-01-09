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
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap'
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../slices/viewHotelSlice'
import { useGetHotelDetailsMutation } from '../../slices/userApiSlice';



const SearchDrawer = ({setDrawerOpen}) => {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const [restaurantsData, setRestaurantsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { hotelInfo } = useSelector((state) => state.hotelAuth);

    const navigate = useNavigate()
    const HOTEL_IMAGE_DIR_PATH = 'http://localhost:5000/restaurantImages/'
    const VITE_PROFILE_IMAGE_DIR_PATH = HOTEL_IMAGE_DIR_PATH
    const [fetchHotelData] = useGetHotelDetailsMutation()
    const  fetchHotel = async(id)=>{
        try {
          const responseFromApiCall = await fetchHotelData({id:id})
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
            const restaurantArray = responseFromApiCall.data;
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

    const fun=()=>{
        setDrawerOpen(false)
    }

    useEffect(() => {
        fetchData();

    }, [])
    

    return (
        <>
        
            <Drawer
                isOpen={onOpen}
                placement='left'
                onClose={fun}
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
