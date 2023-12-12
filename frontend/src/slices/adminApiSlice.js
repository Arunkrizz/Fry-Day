import { apiSlice } from "./apiSlice";
import { 
    ADMIN_AUTHENTICATION_URL,
    ADMIN_LOGOUT_URL,
    ADMIN_REGISTRATION_URL,
    ADMIN_PROFILE_URL,
    ADMIN_USERS_DATA_FETCH_URL,
    ADMIN_DELETE_USER_URL,
    ADMIN_UPDATE_USER_URL,
    ADMIN_ADD_USER,
    ADMIN_HOTEL_DATA_FETCH_URL,
    ADMIN_UPDATE_HOTEL_STATUS_URL,
    ADMIN_ADD_CATEGORY_URL,
    ADMIN_UPDATE_CATEGORY_URL,
    ADMIN_UNLIST_CATEGORY_URL,
    ADMIN_RELIST_CATEGORY_URL,
    ADMIN_CATEGORIES_DATA_FETCH_URL,
    ADMIN_BLOCK_UNBLOCK_USER


} from '../utils/constants.js';



export const adminApiSlice = apiSlice.injectEndpoints({
    
    endpoints: (builder) => ({
        
        adminLogin: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_AUTHENTICATION_URL,
                method: 'POST',
                body: data
            })

        }),
        adminLogout: builder.mutation({
            
            query: () => ({
                url: ADMIN_LOGOUT_URL,
                method: 'POST'
            })

        }),
        adminRegister: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_REGISTRATION_URL,
                method: 'POST',
                body: data
            })

        }),
        updateAdmin: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_PROFILE_URL,
                method: 'PUT',
                body: data
            })

        }),
        getUsersData: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_USERS_DATA_FETCH_URL,
                method: 'POST',
                body:data
            })

        }),
        getHotelData: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_HOTEL_DATA_FETCH_URL,
                method: 'POST',
                body:data
            })

        }),
        deleteUser: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_DELETE_USER_URL,
                method: 'POST',
                body: data
            })

        }),
        updateUserByAdmin: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_UPDATE_USER_URL,
                method: 'PUT',
                body: data
            })

        }),
        updateRegisterStatus: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_UPDATE_HOTEL_STATUS_URL,
                method: 'PUT',
                body: data
            })

        }),
        addUser: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_ADD_USER,
                method: 'POST',
                body: data
            })

        }),
        addCategory: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_ADD_CATEGORY_URL,
                method: 'POST',
                body: data
            })

        }),
        updateCategoryByAdmin: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_UPDATE_CATEGORY_URL,
                method: 'PUT',
                body: data
            })

        }),
        unListCategoryByAdmin: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_UNLIST_CATEGORY_URL,
                method: 'PUT',
                body: data
            })

        }),
        reListCategoryByAdmin: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_RELIST_CATEGORY_URL,
                method: 'PUT',
                body: data
            })

        }),
        getCategoriesData: builder.mutation({
            
            query: () => ({
                url: ADMIN_CATEGORIES_DATA_FETCH_URL,
                method: 'POST'
            })

        }),
      
        blockUnblockUser:builder.mutation({
            query: (data) => ({
                url:ADMIN_BLOCK_UNBLOCK_USER,
                 method: 'PUT',
                  body: data
            })

        }),

    })

})


export const {

    useAdminLoginMutation,
    useAdminLogoutMutation,
    useAdminRegisterMutation,
    useUpdateAdminMutation,
    useGetUsersDataMutation,
    useDeleteUserMutation,
    useUpdateUserByAdminMutation,
    useAddUserMutation,
    useGetHotelDataMutation,
    useUpdateRegisterStatusMutation,
    useAddCategoryMutation,
    useUpdateCategoryByAdminMutation,
    useUnListCategoryByAdminMutation,
    useReListCategoryByAdminMutation,
    useGetCategoriesDataMutation,
    useBlockUnblockUserMutation,
    

} = adminApiSlice;