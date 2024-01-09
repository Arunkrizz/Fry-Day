import React from 'react'
import CurrentLiveOrders from '../../components/RestaurantComponents/currentLiveOrders'
import AcceptedOrders from '../../components/RestaurantComponents/OrderAwaitingShipment'
import DeliveryUpdate from '../../components/RestaurantComponents/UpdateOrderDelivered'
import { useEffect, useState } from 'react'

const OrderUpdates = () => {

    const [refetchAcceptedOrders,setRefetchAcceptedOrders] =useState(false)
    const [refetchUpdateDelivery,setRefetchUpdateDelivery] = useState(false)
    return (
        <div style={{display:"flex" }}>
            <CurrentLiveOrders refetchAcceptedOrders={refetchAcceptedOrders} setRefetchAcceptedOrders={setRefetchAcceptedOrders}  />
        <AcceptedOrders refetchUpdateDelivery={refetchUpdateDelivery} setRefetchUpdateDelivery={setRefetchUpdateDelivery} refetchAcceptedOrders={refetchAcceptedOrders} setRefetchAcceptedOrders={setRefetchAcceptedOrders} />
        <DeliveryUpdate  refetchUpdateDelivery={refetchUpdateDelivery} setRefetchUpdateDelivery={setRefetchUpdateDelivery}/>
        </div>
    )
}

export default OrderUpdates