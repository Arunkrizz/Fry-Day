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
                body: { userId }
            })
        }),
        checkBlock: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/checkBlock`,
                method: 'PUT',
                body: data
            })
        }),
        fetchNotifications: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/allNotifications`,
                method: 'GET'
            })
        }),
        deleteNotification: builder.mutation({
            query: (notificationId) => ({
                url: `${USERS_URL}/deleteNotification/${notificationId}`,
                method: 'PUT'
            })
        }),
        readMessagesUpdate: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/readMessagesUpdate/${data}`,
                method: 'PUT'
            })
        }),
        markAsReadUpdate: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/markAsReadUpdate`,
                method: 'POST',
                body: { data }
            })
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/forgotPassword`,
                method: 'POST',
                body: data
            })
        }),
        otpVerify: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/otpVerify`,
                method: 'POST',
                body: data
            })
        }),
        resendOtp: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/resendOtp`,
                method: 'POST',
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/resetPassword`,
                method: 'POST',
                body: data
            })
        }),
        likePost: builder.mutation({
            query: (postId) => ({
                url: `${USERS_URL}/likePost/${postId}`,
                method: 'POST'
            })
        }),
        unlikePost: builder.mutation({
            query: (postId) => ({
                url: `${USERS_URL}/unlikePost/${postId}`,
                method: 'DELETE'
            })
        }),
        commentPost: builder.mutation({
            query: ({ postId, text }) => ({
                url: `${USERS_URL}/commentPost/${postId}`,
                method: 'POST',
                body: JSON.stringify({ text }), // Stringify the body
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
            }),
        }),
        commentDelete: builder.mutation({
            query: ({ postId, commentId }) => ({
                url: `${USERS_URL}/commentDelete/${postId}`,
                method: 'DELETE',
                body: { commentId }, // Send commentId directly in the body

            })
        }),
        reportPost: builder.mutation({
            query: ({ postId, data }) => ({
                url: `${USERS_URL}/reportPost`,
                method: 'POST',
                body: {
                    postId: postId,
                    data: data
                }
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
    useCheckBlockMutation,
    useFetchNotificationsMutation,
    useDeleteNotificationMutation,
    useReadMessagesUpdateMutation,
    useMarkAsReadUpdateMutation,
    useForgotPasswordMutation,
    useOtpVerifyMutation,
    useResendOtpMutation,
    useResetPasswordMutation,
    useLikePostMutation,
    useUnlikePostMutation,
    useCommentPostMutation,
    useCommentDeleteMutation,
    useReportPostMutation



} = usersApiSlice;