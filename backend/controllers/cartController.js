import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";
import Product from '../models/productModel.js';
import Cart from '../models/cartModel.js';
import { isCartEmpty ,getTotal,getCartProducts,changeProductQuantity,removeCartProductItem } from '../utils/Helpers/cartHelpers.js';

const addToCart =asyncHandler(async(req,res)=>{
    const proId=req.body.proId
    const userId = req.user._id

    const product = await Product.findOne({_id: proId})
		let proObj = {
			item: proId,
			quantity: 1,
			price:product.price
		}
   
    let userCart = await Cart.findOne({ user: userId });
    // console.log(userCart,"addtocart")
				if (userCart) {
					// console.log(userCart, "usercart");
					try {
						const proExist = userCart.products.some(product => product.item.toString() === proId.toString());
						// console.log(proExist,"proexisst");

						if (proExist) {

							await Cart.updateOne(
								{ user: (userId), 'products.item': proId },
								{
									$inc: { 'products.$.quantity': 1 }
								}
							).then(() => {
                                res.send({ status: true})
								// resolve({ status: true})
							})
								.catch((err) => {
									console.error(err);
								})
						}
						else {
							// console.log("herre");
							await Cart.updateOne(
								{ user: userId },
								{
									$push: { products: proObj }
								}
							)
								.then(() => {
									res.send({ status: true})
									// resolve({ status: true})
								})
								.catch((err) => {
									console.error(err);
								})
						}
					} catch (error) {
						console.log("Failed to update cart:", error);
						// reject(error);
					}
				}
				else {
                    // console.log("!usercart else");
					let cartObj = {
						user: userId,
						products: [proObj]
					};
					let newCart = new Cart(cartObj);
					await newCart.save();
                    res.send({ status: true})
					// resolve({ status: true});
				}
})


const getCart =asyncHandler(async(req,res)=>{

    let cartIsEmpty= await isCartEmpty(req.user._id)
// console.log(cartIsEmpty,"getCart");
if(cartIsEmpty){
    // console.log("kk","getCart");
    // if(req.session.user){
      const promises = [
          getCartProducts(req.user._id),
        getTotal(req.user._id),
        // userHelper.getSubTotal(req.session.user._id)
      ];
      
      Promise.all(promises)
      .then(([products,total]) => {
        // console.log(products,"products",total,"total");
		res.status(200).json({products:products,total:total})
      
        // res.render('home', {products,category });
      })
      .catch((error) => {
        console.log('Failed to get cart:', error);
        // Handle error
      })
  
      
      }
  
      else {
		res.status(200).json({products:[],total:0})
      }
      
})

const changeQuantity=async (req,res)=>{
  
    try {
      console.log(req.body,"chngeqty");
     await changeProductQuantity(req.body).then((response)=>{
        // console.log(response,"chngeqty2");
        res.json(response)
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  const  removeCartProduct=async (req,res)=>{
  
    try {
      console.log(req.body,"removecart product");
     await removeCartProductItem(req.body).then((response)=>{
       
        res.json(response)
      })
    }
    catch (error) {
      console.log(error);
    }
  }
  


export {
    addToCart,
    getCart,
	changeQuantity,
	removeCartProduct
	
}