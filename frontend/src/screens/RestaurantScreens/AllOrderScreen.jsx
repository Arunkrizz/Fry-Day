import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
} from '@chakra-ui/react'
import moment from 'moment';
import { CartProductMeta } from '../../components/UserComponents/CartProductMeta'
import { PRODUCT_IMAGE_DIR_PATH } from '../../utils/constants'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import io from 'socket.io-client'


import { useFetchAllOrdersMutation } from '../../slices/hotelApiSlice'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';

const AllOrderScreen = () => {
    const ENDPOINT = "http://localhost:5000"
    let socket
    const [fetchOrders, { isLoading: isUpdating }] = useFetchAllOrdersMutation()
    const [orders, setOrders] = useState([])
    const [refetch, setRefetch] = useState(false)


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
            } catch (error) {
                console.log("error:", error);
            }
        }
        fetchAllOrders()
    }, [refetch])

   



    return (
        <div>
            <Accordion defaultIndex={[0]} allowMultiple bg={"white"} >
                {orders?.map((order) => (
                    <AccordionItem mb={'20px'}>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    <Text style={{ display: 'flex', flexDirection: 'row' }} >Ordered no : {order._id}
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
                                        <h4 style={{ color: '' }}>₹{item.product.price} x{item.quantity}</h4>
                                    </div>
                                ))}
                                <h3 style={{ color: 'blue' }}>Total: ₹ {order.totalAmount}  </h3>
                             
                            </div>
                        </AccordionPanel>
                    </AccordionItem>
                ))}

            </Accordion>
        </div>
    )
}

export default AllOrderScreen