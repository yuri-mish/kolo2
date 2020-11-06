import { createSlice } from "@reduxjs/toolkit";


export const SystemStateSlice = createSlice({
    name: 'SystemState', 
    initialState:{
        loggedIn: false,
        session: '',
        userName: '',
    }, 
    reducers: {
            setUserName: (state, action) => {
                state.userName = action.payload // mutate the state all you want with immer
              },
           
            }
})

