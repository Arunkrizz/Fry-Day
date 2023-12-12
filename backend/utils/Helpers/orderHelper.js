import Cart from '../../models/cartModel.js'

const getCartProductList= async (userId) => {
    return new Promise(async (resolve, reject) => {
        connectDB()
            .then(async () => {
                let cart = await Cart.findOne({ user: userId }).then((data) => {
                    console.log(data, "o-h getcartprolist");
                    resolve(data?.products)
                })




            })


    })
}

const getTotal= (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("herere in get total ");
            const total = await Cart.aggregate([
                {
                    $match: { user: mongoose.Types.ObjectId.createFromHexString(userId) }
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


const placeOrder= async (details,data, products, total, user_Id, userName) => {
    try {
     return new Promise(async (resolve, reject) => {
         console.log(details, products, total,"raz placeorder oh helper");
         let status = data['paymentMethod'] === 'COD' ? 'placed' : 'pending'

         const productsWithQuantity = products?.map(product => {
             return {
                 product: product.item,
                 quantity: product.quantity,
                 price:product.price
             };
         }); 

         let orderObj = {
             deliveryDetails: {
                 firstname: details.firstname,
                 lastname: details.lastname,
                 state: details.state,
                 address1: details.address1,
                 address2: details.address2,
                 city: details.city,
                 pincode: details.pincode,
                 mobile: details.mobile,
                 email: details.email,
             },
             userName: userName,
             userId: user_Id,
             paymentMethod:data['paymentMethod'],
             products: productsWithQuantity,
             couponDiscountUsed:couponDiscount,
             totalAmount: total,
             status: status,
             date: new Date()
         }
 
         connectDB()
             .then(async () => {
                 let cartId
                 await Order.create(orderObj)
                     .then(async (response) => {
                         cartId = response._id
                         const deleteResult = await Cart.deleteOne({ user: user_Id })

                         resolve(cartId)
                     }).then( async (response) => {
                         console.log("+++++++++", cartId, "o-h cartid");

                         const Products = await Order
                             .findOne({ _id: cartId })
                             .populate("products.product")

                         console.log("+++++++++", Products, "o-h product");

                        

                     }).catch((error) => {
                         console.log(error);
                         reject(error)
                     })
             })
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
