import { createSlice } from '@reduxjs/toolkit';

const storedViewHotel = localStorage.getItem('viewHotel');

// const initialState = {
//     // viewHotel: localStorage.getItem('viewHotel') ? JSON.parse( localStorage.getItem('viewHotel') ) : null

// }

const initialState = {
    viewHotel: storedViewHotel && isValidJSON(storedViewHotel) ? JSON.parse(storedViewHotel) : null
};

function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}


const viewHotelSlice = createSlice({

    name: 'viewHotel',
    initialState: initialState,
    reducers: {

        setCredentials: (state, action) => {
            console.log("set view hotel cred user redux");
            state.viewHotel = action.payload;
            localStorage.setItem( 'viewHotel', JSON.stringify(action.payload) );
        },
        // logout: (state, action) => {
        
        //     state.userInfo = null;
        //     localStorage.removeItem( 'userInfo' );

        // }

    }

});



export const { setCredentials } = viewHotelSlice.actions;


export default viewHotelSlice.reducer;