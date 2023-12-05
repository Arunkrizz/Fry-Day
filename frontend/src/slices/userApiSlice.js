import { apiSlice } from "./apiSlice";
import {
    USER_GOOGLE_AUTH_URL,
    USER_G_AUTH_URL,
    USER_AUTHENTICATION_URL,
    USER_LOGOUT_URL,
    USER_REGISTRATION_URL,
    USER_PROFILE_URL,
    USER_GET_POSTS,
    USER_GET_HOTEL_PRODUCTS,
    USER_GET_HOTEL_LOCATION,
    USER_GET_HOTEL_DETAILS,

} from '../utils/constants.js';

const USERS_URL = '/api/users'

const USER_AUTH_URL = USER_AUTHENTICATION_URL;

export const usersApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        googleLogin: builder.mutation({

            query: (data) => ({
                url: USER_GOOGLE_AUTH_URL,
                method: 'POST',
                body: data
            })

        }),

        login: builder.mutation({

            query: (data) => ({
                url: USER_AUTH_URL,
                method: 'POST',
                body: data
            })

        }),
        logout: builder.mutation({

            query: () => ({
                url: USER_LOGOUT_URL,
                method: 'POST'
            })

        }),
        googleRegister: builder.mutation({

            query: (data) => ({
                url: USER_G_AUTH_URL,
                method: 'POST',
                body: data
            })

        }),
        register: builder.mutation({

            query: (data) => ({
                url: USER_REGISTRATION_URL,
                method: 'POST',
                body: data
            })

        }),

        updateUser: builder.mutation({

            query: (data) => ({
                url: USER_PROFILE_URL,
                method: 'PUT',
                body: data
            })

        }),
        getUserPosts: builder.mutation({

            query: (data) => ({
                url: USER_GET_POSTS,
                method: 'POST',
                body: data
            })

        }),
        getHotelProducts: builder.mutation({

            query: (data) => ({
                url: USER_GET_HOTEL_PRODUCTS,
                method: 'PUT',
                body: data
            })

        }),
        getHotelLocation: builder.mutation({

            query: (data) => ({
                url: USER_GET_HOTEL_LOCATION,
                method: 'PUT',
                body: data
            })

        }),
        getHotelDetails: builder.mutation({

            query: (data) => ({
                url: USER_GET_HOTEL_DETAILS,
                method: 'PUT',
                body: data
            })

        }),

        fetchChat: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/fetchChats`,
                method: 'GET'
            })
        }), 
        sendMessage: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/sendMessage`,
                method: 'POST',
                body: data
            })
        }),
        fetchMessages: builder.mutation({
            query: (chatId) => ({
                url: `${USERS_URL}/allMessages/${chatId}`,
                method: 'GET'
            })
        }),
        accessChat: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/accessChat`,
                method: 'POST',
                body: {userId}
            })
        }),
        checkBlock: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/checkBlock`,
                method: 'PUT',
                body: data
            })
        }),


    })

})


export const {
    useGoogleLoginMutation,
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useGoogleRegisterMutation,
    useUpdateUserMutation,
    useGetUserPostsMutation,
    useGetHotelProductsMutation,
    useGetHotelLocationMutation,
    useGetHotelDetailsMutation,
    useFetchChatMutation,
    useSendMessageMutation,
    useFetchMessagesMutation,
    useAccessChatMutation,
    useCheckBlockMutation

} = usersApiSlice;