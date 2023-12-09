import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  restaurantAddress: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  dineAndDelivery: {
    type: String, // Assuming this should be a String, adjust if it's supposed to be a Boolean or something else
    default: null,
  },
  describeOutlet: {
    type: [String],
    required: true,
  },
  cuisineType: {
    type: [String],
    required: true,
  },
  restaurantImages: {
    type: Array, // Assuming these are file paths or URLs, adjust if needed
    default: 'undefined',
  },
  menuImages: {
    type: Array,
    default: 'undefined',
  },
  foodImages: {
    type: Array,
    default: 'undefined',
  },
  approved: {
    type: String, // Assuming this should be a String, adjust if it's supposed to be a Boolean or something else
    default: false,
  },
  Email:{
    type: String, // Assuming this should be a String, adjust if it's supposed to be a Boolean or something else
    default: null,
  },
  Password:{
    type: String,
    default: 'undefined',
  },
  liveRoom: {
    type: String, 
    default: 'undefined',
  },

});

restaurantSchema.methods.matchPassword = async function (userProvidedPassword) {

  const validPassword = await bcrypt.compare(userProvidedPassword, this.Password);

  return validPassword;

};



const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;

// module.exports = Restaurant;
