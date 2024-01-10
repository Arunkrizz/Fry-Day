import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    Button
} from '@chakra-ui/react'
import moment from 'moment';
import { CartProductMeta } from '../../components/UserComponents/CartProductMeta'
import { PRODUCT_IMAGE_DIR_PATH } from '../../utils/constants'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import io from 'socket.io-client'
import  { lazy, Suspense } from 'react';
const Map = lazy(() => import('../../components/RestaurantComponents/Map'));
import { useFetchAllOrdersMutation, useCancelOrderMutation } from '../../slices/userApiSlice'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';



const OrderScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const ENDPOINT = "https://sevenlier.online"
    let socket
    const [fetchOrders, { isLoading: isUpdating }] = useFetchAllOrdersMutation()
    const [cancelOrder] = useCancelOrderMutation()
    const [orders, setOrders] = useState([])
    const [refetch, setRefetch] = useState(false)
    const [orderCancelled, setOrderCancelled] = useState('')
    const [userPosition,setUserPosition]=useState({})
    const [ restaurantPosition,setRestaurantPosition] = useState({})
    const [viewOrderLocation,setViewOrderLocation]=useState(false)
    const [openPanels, setOpenPanels] = useState([]);

    //alert confirmation
    const submit = (id, storeId) => {
        confirmAlert({
            title: 'Confirm to Cancel order',
            message: 'Are you sure ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => cancelOrderClick(id, storeId)
                },
                {
                    label: 'No',
                    onClick: () => { return false }
                }
            ]
        });
    };





    const formatTimeDifference = (timestamp) => {
        const now = moment();
        const postTime = moment(timestamp);

        const diffInMinutes = now.diff(postTime, 'minutes');
        const diffInHours = now.diff(postTime, 'hours');
        const diffInDays = now.diff(postTime, 'days');

        if (diffInMinutes < 60) {
            return `Ordered ${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (diffInHours < 24) {
            return `Ordered ${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
        } else if (diffInDays < 7) {
            return `Ordered ${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
        } else {
            return `Ordered on ${postTime.format('MMMM DD, YYYY')}`;
        }
    };

    const fetchAllOrders = async () => {
        try {
            const responseFromApi = await fetchOrders()
            setOrders(responseFromApi.data)
        } catch (error) {
            console.log("error:", error);
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, [refetch])

    const cancelOrderClick = async (id, storeId) => {
        try {

            await cancelOrder(id).then((response) => {
                if (response.data === 'success') {
                    setOrderCancelled(storeId)
                    setRefetch(!refetch)
                }
            })
        } catch (error) {
            console.log("error:", error)
        }
    }




    useEffect(() => {
        socket = io(ENDPOINT)
        if(userInfo){
             socket.emit("setup", userInfo.id)
        }
        
        if (orderCancelled) {
            socket.emit('cancelOrder', orderCancelled)
        }


        socket.on('orderUpdated',()=>{
            fetchAllOrders()
          })
    
    
        
    }, [orderCancelled,userInfo])


   



    const handleAccordionChange = (index) => {
        const newOpenPanels = [...openPanels];
        newOpenPanels[index] = !openPanels[index];
        setOpenPanels(newOpenPanels);
      };
      
      const handleMapButtonClick = (index) => {
        const newOpenPanels = [...openPanels];
        newOpenPanels[index] = !openPanels[index];
        setOpenPanels(newOpenPanels);
      };

    return (
        <div>
            <Accordion defaultIndex={[0]} allowMultiple bg={"white"} >
                {orders?.map((order,index) => (
                    <AccordionItem
                    key={index}
                    mb={'20px'}
                    isopen={openPanels[index]}
                    onChange={() => handleAccordionChange(index)}>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    <Text style={{ display: 'flex', flexDirection: 'row' }} >Ordered from : {order.store.restaurantName}
                                        <p style={{ color: 'grey', fontSize: '0.8em', paddingLeft: "15px" }}>{formatTimeDifference(order.date)}</p>
                                    </Text>
                                    <Text>Status :{order.status}</Text>

                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <div >
                                {order?.products?.map((item,index) => (
                                    <div style={{ marginBottom: "15px", display: 'flex', alignItems: 'center' }}  key={index}>
                                        <CartProductMeta
                                   
                                            name={item.product.title}
                                            description={item.product.description}
                                            image={PRODUCT_IMAGE_DIR_PATH + item?.product.images[0]}

                                        />
                                    </div>
                                ))}
                                <h3 style={{ color: 'blue' }}>Total: ₹ {order.totalAmount}  </h3>
                                {(order.status === "placed" || order.status === "pending") ? <Button  colorScheme="red" style={{  color: 'white' }} onClick={() => {
                                   submit(order._id,order.store._id)
                                   
                                }}>Cancel order</Button> : ""}
                                {(order.status === "shipped") ?<><Button colorScheme="blue"  style={{ marginLeft: "15px", color: 'white' }} onClick={() => {
                                    setUserPosition({lat: order.deliveryDetails.latitude, lng:order.deliveryDetails.longitude})
                                    setRestaurantPosition({lat: order.store.latitude, lng:order.store.longitude})
                                    handleMapButtonClick(index)

                                }}>{!openPanels[index]?"View your order location":"Hide your order location"} </Button></> : ""}

                               { (openPanels[index])?<Suspense fallback={<div>Loading Map...</div>}>
                                    <Map 
                                    userPosition={ userPosition }
                                    restaurantPosition={restaurantPosition} 
                                    />
                                </Suspense>:""}
                              
                            </div>
                        </AccordionPanel>
                    </AccordionItem>
                ))}

            </Accordion>
        </div>
    )
}

export default OrderScreen