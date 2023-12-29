import React from 'react'
import CurrentLiveOrders from '../../components/RestaurantComponents/currentLiveOrders'
import AcceptedOrders from '../../components/RestaurantComponents/OrderAwaitingShipment'
import { useEffect, useState } from 'react'

const OrderUpdates = () => {

    const [refetchAcceptedOrders,setRefetchAcceptedOrders] =useState(false)
    return (
        <div style={{display:"flex"}}>
            <CurrentLiveOrders refetchAcceptedOrders={refetchAcceptedOrders} setRefetchAcceptedOrders={setRefetchAcceptedOrders}  />
        <AcceptedOrders refetchAcceptedOrders={refetchAcceptedOrders} setRefetchAcceptedOrders={setRefetchAcceptedOrders} />
        </div>
    )
}

export default OrderUpdates