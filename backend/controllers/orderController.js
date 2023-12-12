import asyncHandler from 'express-async-handler';
import {getCartProductList,getTotal,placeOrder} from '../utils/Helpers/orderHelper.js';


 
const checkOut =async (req,res)=>{
    try { 
      // const walletAmount= await walletHelper.getWalletBalance(req.session.user._id)
    //   const couponDiscount = parseInt(req.body.couponDiscount)
      console.log(req.body,"in checkout o-c");
    //  const couponCode=req.body?.couponCode
    //  const userId =req.session.user._id
    //  console.log(couponCode,"coupon code");
    //  const ifCouponUsed= await userHelper.addCouponToUser(couponCode, userId);
      const user=req.user
    //   const totalAmt= (req.body.total)

      let products=await getCartProductList(req.user._id)

      // console.log(products,"in checkout u-c");

      let totalPrice= await getTotal(req.user._id)

    //   totalPrice=totalPrice-couponDiscount

      // if (req.body.walletUsed==='true'){
      //   console.log("in if ",totalPrice,"kk", walletAmount,"kk");
      //   totalPrice=totalPrice-walletAmount
      // }
    //   console.log(totalPrice,"in checkout u-c",totalAmt,"hhh");
    //   let deliveryAddress= await userHelper.fetchPrimaryAddress(req.session.user._id,req.body.addressId)
      // console.log(req.body,"deliverydetails /checkoutt");
      // await userHelper.addAddress(req.body,user._id)
      await placeOrder(deliveryAddress,req.body,products,totalPrice,user._id,user.name).then (async  (orderId)=>{
        console.log(orderId,"ord Id o-c chkout"); 
        if(req.body['paymentMethod']=='COD'){
          
          res.json({checkoutcomplete:true})
        }
        // else {
        //  await orderHelper.generateRazorpay(orderId,totalAmt).then( (response)=>{
        //     console.log(totalAmt,"!==",totalPrice);
        //     if(totalAmt!==totalPrice){
        //       walletHelper.reduceWalletBalance(req.session.user._id,totalPrice)
        //     }
        //     res.json(response) 
        //   }).catch((error)=>{
        //     console.log(error,"ERr");
        //   })
        // }
    
      }).catch((error)=>{
        console.log(error);
      })
      console.log("here");
    } catch (error) {
      console.log(error);
    }
    }