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


const OrderScreen = () => {
    const ENDPOINT = "http://localhost:5000"
    let socket
    const [fetchOrders, { isLoading: isUpdating }] = useFetchAllOrdersMutation()
    const [cancelOrder] = useCancelOrderMutation()
    const [orders, setOrders] = useState([])
    const [refetch, setRefetch] = useState(false)
    const [orderCancelled, setOrderCancelled] = useState('')
    const [userPosition,setUserPosition]=useState({})
    const [ restaurantPosition,setRestaurantPosition] = useState({})
    const [viewOrderLocation,setViewOrderLocation]=useState(false)

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


    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const responseFromApi = await fetchOrders()
                setOrders(responseFromApi.data)
                console.log(responseFromApi, "all orders fetch");
            } catch (error) {
                console.log("error:", error);
            }
        }
        fetchAllOrders()
    }, [refetch])

    const cancelOrderClick = async (id, storeId) => {
        try {
            console.log(id, storeId, "iddd");

            await cancelOrder(id).then((response) => {
                // console.log(response, "respoo");
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
        if (orderCancelled) {
            socket.emit('cancelOrder', orderCancelled)
        }
    }, [orderCancelled])

    return (
        <div>
            <Accordion defaultIndex={[0]} allowMultiple bg={"white"} >
                {orders?.map((order) => (
                    <AccordionItem mb={'20px'}>
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
                                {order?.products?.map((item) => (
                                    <div style={{ marginBottom: "15px", display: 'flex', alignItems: 'center' }}>
                                        <CartProductMeta
                                   
                                            name={item.product.title}
                                            description={item.product.description}
                                            image={PRODUCT_IMAGE_DIR_PATH + item?.product.images[0]}
                                        // isGiftWrapping={isGiftWrapping}

                                        />
                                        {/* <h4 style={{ color: '' }}>₹{item.product.price} x{item.quantity}</h4> */}
                                    </div>
                                ))}
                                <h3 style={{ color: 'blue' }}>Total: ₹ {order.totalAmount}  </h3>
                                {(order.status === "placed" || order.status === "pending") ? <Button  colorScheme="red" style={{  color: 'white' }} onClick={() => {
                                   submit(order._id,order.store._id)
                                   
                                }}>Cancel order</Button> : ""}
                                {(order.status === "placed") ? <Button colorScheme="blue"  style={{ marginLeft: "15px", color: 'white' }} onClick={() => {
                                    setUserPosition({lat: order.deliveryDetails.latitude, lng:order.deliveryDetails.longitude})
                                    setRestaurantPosition({lat: order.store.latitude, lng:order.store.longitude})
                                    setViewOrderLocation(!viewOrderLocation) 

                                }}>{!viewOrderLocation?"View your order location":"Hide your order location"} </Button> : ""}

                               { (viewOrderLocation)?<Suspense fallback={<div>Loading Map...</div>}>
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