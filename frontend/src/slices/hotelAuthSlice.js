import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    hotelInfo: localStorage.getItem('hotelInfo') ? JSON.parse( localStorage.getItem('hotelInfo') ) : null

}

const hotelAuthSlice = createSlice({

    name: 'hotelAuth',
    initialState: initialState,
    reducers: {

        setCredential: (state, action) => {
            console.log(initialState,"setcred 1 redux");
            state.hotelInfo = action.payload;
            localStorage.setItem( 'hotelInfo', JSON.stringify(action.payload) );
        },
        logout: (state, action) => {
        
            state.hotelInfo = null;
            localStorage.removeItem( 'hotelInfo' );

        }

    }

});



export const { setCredential, logout } = hotelAuthSlice.actions;


export default hotelAuthSlice.reducer;