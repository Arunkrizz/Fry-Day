import User from "../../models/userModel.js";
import Cart from '../../models/cartModel.js'


const isCartEmpty = async (userId) => {

    // console.log(userId, "here is cart empty u-c");
    return new Promise((resolve, reject) => {


        Cart.findOne({ user: userId })
            .then((data) => {
                const productArrayLength = data?.products?.length;
                // console.log(data, "cart isempty");
                resolve(productArrayLength)
            }).catch((error) => {
                console.log(error);
                reject(false);
            })

    })

}

const getCartProducts = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cartItems = await Cart.aggregate([
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
            ]).exec();
            // console.log(cartItems[0]?.product, "getcart pro u-h");
            resolve(cartItems);
        } catch (error) {
            reject(error);
        }
    });
}

const getTotal = async (userId) => {
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
                        total: {
                            $sum: {
                                $multiply: [{ $toDouble: '$quantity' }, { $toDouble: '$product.price' }]
                            }
                        }
                    }
                }
            ]).exec();

            const cartTotal = await Cart.findOneAndUpdate({ user: userId }, { $set: { total: total[0]?.total } })

            // console.log(total,"total u-h ");
            resolve(total[0]?.total);
        } catch (error) {
            reject(error);
        }
    });
}


const changeProductQuantity =async (details) => {
console.log(details,"details");
	// quantity = parseInt(details.quantity)
	let count = parseInt(details.count)
	// stockCount = parseInt(details.stockcount)
	// proId = (details.product)
	// console.log(proId, "details");
	return new Promise(async (resolve, reject) => {
		
			await Cart.updateOne(
				{ _id: (details.cartid), 'products.item': details.proId },
				{
					$set: { 'products.$.quantity': count }
				}
			)
				// .then(async ()=>{
				// 	await Product.findByIdAndUpdate(proId,{$inc:{Stock:stockCount}})
				// })
				.then((response) => {
                    // console.log("resolved");
					resolve(response)
				})
				.catch((err) => {
					console.error(err);
					reject(err);
				})
		
	})
}

const removeCartProductItem=async (details) => { 
    return new Promise(async (resolve, reject) => {
        await Cart.updateOne(
            { _id: (details.cartid) },
            {
                $pull: { products: { item: (details.proId) } }
            }
        ).then((response) => {
            resolve({ removeProduct: true })
        })
            .catch((err) => {
                console.error(err);
                reject(err);
            })
    });
}

export {
    isCartEmpty,
    getCartProducts,
    getTotal,
    changeProductQuantity,
    removeCartProductItem

};
