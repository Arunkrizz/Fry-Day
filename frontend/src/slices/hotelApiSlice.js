import { apiSlice } from "./apiSlice";
import {
    USER_HOTEL_REGISTRATION_URL,
    USER_HOTEL_REGISTRATION_URL2,
    HOTEL_LOGOUT_URL,
    HOTEL_AUTH_URL,
    HOTEL_FETCH_CATEGORIES,
    HOTEL_ADD_PRODUCT,
    HOTEL_ADD_POST
} from '../utils/constants.js';

const HOTEL_URL = '/api/hotel'

export const hotelApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        hotelLogin: builder.mutation({
            
            query: (data) => ({
                url: HOTEL_AUTH_URL,
                method:'POST',
                body:data
            })

        }),

        hotelRegister: builder.mutation({
            
            query: (data) => ({
                url: USER_HOTEL_REGISTRATION_URL,
                method: 'POST',
                body: data
            })

        }),
      
        hotelRegister2: builder.mutation({
            
            query: (data) => ({
                url: USER_HOTEL_REGISTRATION_URL2,
                method: 'PUT',
                body: data
            })

        }),
        hotelLogout: builder.mutation({
            
            query: () => ({
                url: HOTEL_LOGOUT_URL,
                method: 'POST'
            })

        }),
        getCategories: builder.mutation({
            query: () => ({
                url: HOTEL_FETCH_CATEGORIES,
                method: 'GET'
            })
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: HOTEL_ADD_PRODUCT,
                method: 'POST',
                body: data
            })
        }),
        addPost: builder.mutation({
            
            query: (data) => ({
                url: HOTEL_ADD_POST,
                method: 'POST',
                body: data
            })

        }),
        fetchChats: builder.mutation({
            query: () => ({
                url: `${HOTEL_URL}/fetchChats`,
                method: 'GET'
            })
        }), 
        sendMessages: builder.mutation({
            query: (data) => ({
                url: `${HOTEL_URL}/sendMessage`,
                method: 'POST',
                body: data
            })
        }),
        fetchMessagess: builder.mutation({
            query: (chatId) => ({
                url: `${HOTEL_URL}/allMessages/${chatId}`,
                method: 'GET'
            })
        }),
        accessChats: builder.mutation({
            query: (userId) => ({
                url: `${HOTEL_URL}/accessChat`,
                method: 'POST',
                body: {userId}
            })
        }),
        fetchNotificationss: builder.mutation({
            query: () => ({
                url: `${HOTEL_URL}/allNotifications`,
                method: 'GET'
            })
        }),
        deleteNotifications: builder.mutation({
            query: (notificationId) => ({
                url: `${HOTEL_URL}/deleteNotification/${notificationId}`,
                method: 'PUT'
            })
        }),
        readMessagesUpdates: builder.mutation({
            query: (data) => ({
                url: `${HOTEL_URL}/readMessagesUpdate/${data}`,
                method: 'PUT'
            })
        }),
        markAsReadUpdates: builder.mutation({
            query: (data) => ({
                url: `${HOTEL_URL}/markAsReadUpdates`,
                method: 'POST',
                body: {data}
            })
        }),
        fetchAllOrders: builder.mutation({
            query: () => ({
                url: `${HOTEL_URL}/fetchAllOrders`,
                method: 'GET'
            })
        }),
    
    })
})





export const {
    useHotelRegisterMutation,
    useHotelRegister2Mutation,
    useHotelLogoutMutation,
    useHotelLoginMutation,
    useGetCategoriesMutation, 
    useAddProductMutation ,
    useAddPostMutation,
    useFetchChatsMutation,
    useSendMessagesMutation,
    useFetchMessagessMutation,
    useAccessChatsMutation,
    useFetchNotificationssMutation,
    useDeleteNotificationsMutation,
    useReadMessagesUpdatesMutation,
    useMarkAsReadUpdatesMutation,
   useFetchAllOrdersMutation


            } = hotelApiSlice;