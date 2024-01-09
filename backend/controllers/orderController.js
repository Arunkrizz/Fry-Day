import asyncHandler from 'express-async-handler';
import { getCartProductList, getTotal, placeOrder } from '../utils/Helpers/orderHelper.js';
import Order from '../models/orderModel.js';
 
const checkOut = asyncHandler(async (req, res) => {  
  try { 
    const user = req.user
    let products = await getCartProductList(req.user._id)
    let uniqueStoreIds = new Set(products.map(product => product.item.stores.toString()));
    const productsForStores = [];
    // Iterate over unique store IDs and filter products for each store
    uniqueStoreIds.forEach(storeId => {
      const productsForStore = products.filter(product => product.item.stores.toString() === storeId);
      productsForStores.push(productsForStore);
    });
    let totalPrice = await getTotal(req.user._id)
    await placeOrder(req.body, products, totalPrice, user._id, user.name, productsForStores).then(async (orderId) => {

      if (req.body.paymentMethod == 'cod') {

        res.json({ orderId: orderId })
      }
     }).catch((error) => {
      console.log(error);
    })
    // console.log("here");
  } catch (error) {
    console.log(error);
  }
})

const fetchAllOrders =asyncHandler(async (req,res)=>{
  const orders = await Order.find({userId:req.user._id})
  .sort({ date: -1 })
  .populate("store")
  .populate("products.product")

  if(orders){
  res.status(200).json(orders)
  }
})

const cancelOrder =asyncHandler(async(req,res)=>{

  await Order.findByIdAndUpdate(req.params.id,{$set:{status:"cancelled"}})
  .then(()=>{
    res.status(200).json("success")
  })
})

export {
  checkOut,
  fetchAllOrders,
  cancelOrder
}