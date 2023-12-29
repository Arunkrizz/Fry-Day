import Cart from '../../models/cartModel.js'
import mongoose from 'mongoose'
import Order from '../../models/orderModel.js'

const getCartProductList= async (userId) => {
    return new Promise(async (resolve, reject) => {
        
                let cart = await Cart.findOne({ user: userId }).populate('products.item').then((data) => {
                    // console.log(data, "o-h getcartprolist");
                    resolve(data?.products)
                })




           


    })
}

const getTotal= (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("herere in get total ");
            const total = await Cart.aggregate([
                {
                    $match: { user: (userId) }
                },
                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        item: 1, quantity: 1, product: { $arrayElemAt: ['$product', 0] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: { $multiply: ['$quantity', '$product.Price'] } }
                    }
                }
            ]).exec();

            const cartTotal=await Cart.findOneAndUpdate({user:userId},{$set:{total:total[0]?.total}})

            // console.log(total,"total u-h ");
            resolve(total[0]?.total);
        } catch (error) {
            reject(error);
        }
    }); 
}


const placeOrder= async (details, productss, total, user_Id, userName,productsForStores) => {
    try {
     return new Promise(async (resolve, reject) => {
        //  console.log(details, products, total,"raz placeorder oh helper");
         let status = details.paymentMethod=== 'cod' ? 'placed' : 'pending'
         let length = productsForStores.length
         let count =0
        //  console.log(length,"length");

     let orders=[]  

const createOrder =async (products)=>{

    const grandTotal = products.reduce((total, product) => {
        return total + product.quantity * product.item.price;
      }, 0);
      
    //   console.log('Grand Total:', grandTotal);
// console.log(products,"foreacjh");
    // ?? add store to order??// pending

         const productsWithQuantity = products?.map(product => {
             return {
                 product: product.item._id,
                 quantity: product.quantity,
                 price:product.price,
                 store:product.item.stores,
             }
         }); 
console.log(details,"pwithq")
         let orderObj = {
             deliveryDetails: {
                 name: details.name,
                 streetName: details.address,
                 locality: details.locality,
                 mobile: details.mobile,
                 latitude:details.latitude,
                 longitude:details.longitude
             },
             userName: userName,
             userId: user_Id,
             paymentMethod:details.paymentMethod,
             products: productsWithQuantity,
             totalAmount: grandTotal,
             store:productsWithQuantity[0].store,
             status: status,
             date: new Date()
         } 
 
       
                 let cartId
                 await Order.create(orderObj)
                     .then(async (response) => {
                         cartId = response._id
                         const deleteResult = await Cart.deleteOne({ user: user_Id })
                       
                         
                     }).then( async (response) => {
                        //  console.log("+++++++++", cartId, "o-h cartid");

                         const Products = await Order
                             .findOne({ _id: cartId })
                             .populate("products.product")

                             count ++
                             //  resolve(cartId)
                              orders.push(Products)
                              if(count===length){
                                
                                 resolve(orders)
                              }

                         console.log("+++++++++", Products, "order popu product");

                        

                     }).catch((error) => {
                         console.log(error);
                         reject(error)
                     })
                    }

                    //FOR DIFFERING PRODUCTS FROM DIFFERERNT STORES

                    for (const pro of productsForStores) {
                        createOrder(pro);
                      }
                      

                      
             
     })
    } catch (error) {
     console.log(error);
    }
 }


export{
    getCartProductList,
    getTotal,
    placeOrder,
    
}
