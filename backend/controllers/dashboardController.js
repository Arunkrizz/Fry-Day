import asyncHandler from 'express-async-handler';
import {
    adminGetHotel,
    adminGetBoxs,
    hotelOrderCount,
    getProductSale,
    orderCountByDate,
    getHotelBoxes

} from '../utils/Helpers/dashboardHelper.js'

const adminGetHotelDashboard = asyncHandler(async(req,res)=>{
         /*
     # Desc: fetch restaurants and its orders count data
     # Route: POST /api/admin/adminGetHotelDashboard
     # Access: PRIVATE
    */
const result = await adminGetHotel(res);
res.json(result); // Send the result back to the client
})

const adminGetDeptDashboardBoxs = asyncHandler(async (req, res) => {

      /*
     # Desc: fetch data for display
     # Route: POST /api/admin/adminGetDeptDashboardBoxs
     # Access: PRIVATE
    */
    const result = await adminGetBoxs(res);
    res.json(result); // Send the result back to the client
  });

  const adminGetRestaurantOrderCount = asyncHandler(async (req, res) => {

 /*
     # Desc: fetch data of restaurant order date wise
     # Route: POST /api/admin/adminGetRestaurantOrderCount
     # Access: PRIVATE
    */

    const result = await hotelOrderCount(res);
    res.json(result); // Send the result back to the client
  });

  const getProductSales = asyncHandler(async (req, res) => {

 /*
     # Desc: fetch data of products order count
     # Route: POST /api/hotel/getProductSales
     # Access: PRIVATE
    */
    
    const result = await getProductSale(req.hotel._id,res);
    res.json(result); // Send the result back to the client
  });

  const hotelGetOrderCountByDate = asyncHandler(async (req, res) => {

 /*
     # Desc: fetch data of  order count by date
     # Route: POST /api/hotel/hotelGetOrderCountByDate
     # Access: PRIVATE
    */

    const result = await orderCountByDate(req.hotel._id,res);
    res.json(result); // Send the result back to the client
  });

  const getDeptDashboardBoxs = asyncHandler(async (req, res) => {

/*
     # Desc: fetch data to display
     # Route: POST /api/hotel/getDeptDashboardBoxs
     # Access: PRIVATE
    */

    const result = await getHotelBoxes(req.hotel._id,res);
    res.json(result); // Send the result back to the client
  });


export {
    adminGetHotelDashboard,
    adminGetDeptDashboardBoxs,
    adminGetRestaurantOrderCount,
    getProductSales,
    hotelGetOrderCountByDate,
    getDeptDashboardBoxs
}