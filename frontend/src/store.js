import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice.js';
import adminAuthReducer from './slices/adminAuthSlice.js';
import hotelAuthReducer from './slices/hotelAuthSlice.js';
import viewHotelReducer from "./slices/viewHotelSlice.js";
import { apiSlice } from "./slices/apiSlice.js";

const store = configureStore({

    reducer: {
        auth: authReducer,
        adminAuth: adminAuthReducer,
        hotelAuth:hotelAuthReducer,
        viewHotel:viewHotelReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true

});


export default store;