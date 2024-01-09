import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose';
import Hotel from '../../models/restaurantModel.js'
import Order from '../../models/orderModel.js'
import User from '../../models/userModel.js';
import Product from '../../models/productModel.js'
import Post from '../../models/postModel.js'

const adminGetHotel = async ( res) => {
    try {
        const results = await Hotel.aggregate([
            {
              $lookup: {
                from: 'orders', // Assuming your Order model is in a collection named 'orders'
                let: { restaurantId: '$_id' },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ['$store', '$$restaurantId'] }
                    }
                  },
                  {
                    $count: 'orderCount'
                  }
                ],
                as: 'restaurantOrders'
              }
            },
            {
              $project: {
                _id: 0,
                id: '$restaurantName',
                // restaurantName: 1, // Assuming 'restaurantName' is the field in your Restaurant model that you want to display
                value: {
                  $cond: {
                    if: { $isArray: '$restaurantOrders' },
                    then: { $arrayElemAt: ['$restaurantOrders.orderCount', 0] },
                    else: 0
                  }
                }
              }
            },
            {
              $addFields: {
                value: { $ifNull: ['$value', 0] }
              }
            }
          ]);
          

        return results
        // Or handle results as needed
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const adminGetBoxs = async ( res) => {
    console.log("chk adminGetBoxs")
    try {
      const hotel = await Hotel.find({ approved:true})
      const order = await Order.find({ status:"delivered"})
      const user = await User.find({ is_blocked:false})
      const product = await Product.find({})
      const post = await Post.find({isRemoved:false})

      let data={
        hotel:hotel.length,
        order:order.length,
        user:user.length,
        product:product.length,
        post:post.length
      }
      console.log(data,"data")
      return data;
    } catch (error) {
        
      res.status(500).json({ error: "Internal server error" });
    }
  };
 
  const hotelOrderCount = async ( res) => {
    console.log("Checking Count");
    try {
      const restaurantsWithOrdersCount = await Hotel.aggregate([
        {
          $lookup: {
            from: 'orders', // Assuming your Order model is in a collection named 'orders'
            let: { restaurantId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$store', '$$restaurantId'] }
                }
              },
              {
                $count: 'orderCount'
              }
            ],
            as: 'restaurantOrders'
          }
        },
        {
          $project: {
            _id: 0,
            id: '$restaurantName',
            // restaurantName: 1, // Assuming 'restaurantName' is the field in your Restaurant model that you want to display
            value: {
              $cond: {
                if: { $isArray: '$restaurantOrders' },
                then: { $arrayElemAt: ['$restaurantOrders.orderCount', 0] },
                else: 0
              }
            }
          }
        },
        {
          $addFields: {
            value: { $ifNull: ['$value', 0] }
          }
        }
      ]);
      return restaurantsWithOrdersCount;
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const getProductSale = async (hotelId, res) => {
    console.log("Checking getProductSale");
    try {
      const productSale =  await Order.aggregate([
        {
          $match: {
            'store': hotelId,
          },
        },
        {
          $match: {
            'status': "delivered",
          },
        },
        {
          $unwind: '$products',
        },
        {
          $lookup: {
            from: 'products',
            localField: 'products.product',
            foreignField: '_id',
            as: 'productData',
          },
        },
        {
          $group: {
            _id: '$products.product',
            id: { $first: '$productData.title' }, // Assuming there's a 'name' field in the 'Product' model
            value: { $sum: 1 },
          },
        },
      ]);

    console.log(productSale,"productSale")
      return productSale;
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const orderCountByDate = async (hotelId, res) => {
    try {
      const orderCountByDate =  await Order.aggregate([
        {
          $match: {
            'store': hotelId,
          },
        },
        {
          $match: {
            'status': "delivered",
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%d-%m-%Y", date: "$date" } },
            value: { $sum: 1 },
          },
        },
        {
          $project: {
            id: '$_id',
            value: 1,
            _id: 0, // Exclude the original _id field if you don't need it
          },
        },
      
      ]);
      

    const formattedResult = orderCountByDate.map(item => ({
        value: item.value,
        id: new Date(item.id).toLocaleDateString()
    }));
      return formattedResult;
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const getHotelBoxes = async ( hotelId,res) => {
    console.log("chk GetBoxs")
    try {
      // const hotel = await Hotel.find({ approved:true})
      // const order = await Order.find({ status:"delivered"})
      const orders = await Order.find({ status: "delivered", store: hotelId });

      // const user = await User.find({ is_blocked:false})
      // const product = await Product.find({})
      const post = await Post.find({isRemoved:false, stores: hotelId})

      let data={
        // hotel:hotel.length,
        order:orders.length,
        // user:user.length,
        // product:product.length,
        post:post.length
      }
      console.log(data,"data")
      return data;
    } catch (error) {
        
      res.status(500).json({ error: "Internal server error" });
    }
  };


export {
    adminGetHotel,
    adminGetBoxs,
    hotelOrderCount,
    getProductSale,
    orderCountByDate,
    getHotelBoxes
}