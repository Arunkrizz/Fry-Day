import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice.js';
import adminAuthReducer from './slices/adminAuthSlice.js';
import hotelAuthReducer from './slices/hotelAuthSlice.js';
import viewHotelReducer from "./slices/viewHotelSlice.js";
import { apiSlice } from "./slices/apiSlice.js";
///////////////////////////////////////////////////////////////////////

// Custom middleware to handle errors globally
// const errorMiddleware = (store) => (next) => async (action) => {
//     if (action.type.endsWith('rejected')) {
//       // Handle the error globally
//       console.error('Global Error Handler:', action.error.message);
//       // Optionally, dispatch an action, show a modal, or perform other actions based on the error.
 
//     }
  
//     // Continue with the action
//     return next(action);
//   };

  /////////////////////////////////////////////////////////

const store = configureStore({

    reducer: {
        auth: authReducer,
        adminAuth: adminAuthReducer,
        hotelAuth:hotelAuthReducer,
        viewHotel:viewHotelReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware
      // ,errorMiddleware
      ),
    devTools: true

});


export default store;