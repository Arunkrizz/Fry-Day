import React, { useEffect,useState } from 'react'
import RestaurantHeroHeader from '../../components/UserComponents/RestaurantHeroHeader'
import { useSelector } from 'react-redux'
import RestaurantProducts from '../../components/UserComponents/RestaurantProducts';
import { useGetHotelProductsMutation} from '../../slices/userApiSlice';
// import { useGetHotelLocationMutation } from '../../slices/userApiSlice';
import { useGetHotelDetailsMutation } from '../../slices/userApiSlice';

function RestaurantProfile({setLocation}) {

  
  const [fetchHotelProducts] = useGetHotelProductsMutation()
  const [fetchHotel] = useGetHotelDetailsMutation()
  const [products , setProducts] = useState('')
  const [hotel,setHotel] = useState('')

  const { viewHotel } = useSelector( (state) => state.viewHotel);
  // console.log(viewHotel,"viewHotel")
  useEffect(()=>{
    const fetchProducts =async ()=>{
      try {
        const responseFromApiCall = await fetchHotelProducts({...viewHotel})
        // console.log(responseFromApiCall,"proddss hotel")
        setProducts (responseFromApiCall.data)
      } catch (error) {
        
      }
    }
    fetchProducts()
  },[])

  useEffect(()=>{
    const fetchHotelDetail =async ()=>{
      try {

        const responseFromApiCall = await fetchHotel({id:viewHotel._id})
        // console.log(responseFromApiCall,"details profile hotel")
        setHotel (responseFromApiCall.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchHotelDetail()
  },[viewHotel])

  return (
    <>
    <RestaurantHeroHeader hotel={hotel} setLocation={setLocation}/>
    <div style={{ display: "flex", flexWrap: "wrap"}}>
  {products?(products.map((item, index) => (
    <React.Fragment key={index}>
      <RestaurantProducts product={item}  />
      {(index + 1) % 3 === 0 && <div style={{ width: "100%" }}></div>}
    </React.Fragment>
  ))):""}
</div>

    </>
  )
}

export default RestaurantProfile