import mongoose from 'mongoose';


const cartSchema= new mongoose.Schema({
    user:{
    type: mongoose.Schema.Types.ObjectId,
    required:true 
 },
 products: [
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Product',
      required: true
    },
    quantity: {
      type: Number,
      
    },
    price:{
      type:Number
    }
  }
],
total:{
  type:Number,
}
})

const Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart;
export default Cart