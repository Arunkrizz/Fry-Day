import User from "../../models/userModel.js";
import Hotel from '../../models/restaurantModel.js'


const updateRegisterStatus = async (id)=>{
  try {

    const hotel = await Hotel.findById(id);

    if (!hotel) {

      // If the user wasn't found, return a status indicating failure
      return { success: false, message: "Hotel not found." };
      
    }

    // Update user.name and user.email with the new values
    hotel.approved = true;
   

    // Save the updated user data
    await hotel.save();

    return { success: true, message: "User updated successfully." };

  } catch (error) {

    console.error("Error updating user:", error);
    throw error;

  }
}

const fetchAllHotels = async ({pages}) =>{
  const PAGE_SIZE =3
  try {

    // console.log(pages,"pgs");

    const hotels = await Hotel.find()
    .skip((pages - 1) * PAGE_SIZE)
  .limit(PAGE_SIZE);

    return hotels;

  } catch (error) {

    console.error("Error fetching users:", error);

    throw error;

  }
}

const fetchAllUsers = async ({pages}) => {
  const PAGE_SIZE=3
  try {

    const users = await User.find({})
    .skip((pages - 1) * PAGE_SIZE)
  .limit(PAGE_SIZE);

    return users;

  } catch (error) {

    console.error("Error fetching users:", error);

    throw error;

  }

};

const deleteUser = async (userId) => {

  try {

    // Attempt to delete the user by their _id
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {

      // If the user wasn't found (already deleted or never existed), return a status indicating failure
      return { success: false, message: "User not found." };

    }

    // If the user was successfully deleted, return a status indicating success
    return { success: true, message: "User deleted successfully." };

  } catch (error) {

    console.error("Error deleting user:", error);

    throw error;

  }

};

const updateUser = async (userId) => {

  try {

    const user = await User.findById(userId);

    if (!user) {

      // If the user wasn't found, return a status indicating failure
      return { success: false, message: "User not found." };
      
    }

    if(user.is_blocked===false){
      user.is_blocked=true
    }else if(user.is_blocked===true){
      user.is_blocked=false
    }
console.log(user,"upd sts")
    // Save the updated user data
    await user.save();

    return { success: true, message: "User updated successfully..." };

  } catch (error) {

    console.error("Error updating user:", error);
    throw error;

  }

};

export { updateRegisterStatus,fetchAllUsers, deleteUser, updateUser, fetchAllHotels };
