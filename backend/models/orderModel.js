import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  deliveryDetails: {
    name: {
      type: String,
      required: true,
    },
    streetName: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    latitude:{
      type:String,
      required:true
    },
    longitude:{
      type:String,
      required:true
    }

  },
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Assuming you have a User model defined
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1, // You can set a default quantity if needed
    },
    price: {
      type: Number
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    }
  }],
  
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['placed', 'pending', 'shipped', 'delivered', 'cancelled', 'return requested', 'returned','accepted','rejected'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  delivered: {
    status: {
      type: Boolean,
      default: false
    },
    deliveredDate: {
      type: Date
    }
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  }
  // Add more properties as needed
});


const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;
export default Order;
