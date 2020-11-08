import { createSlice } from "@reduxjs/toolkit";

export interface ISession  {
  loggedIn: boolean,
  userName: string
 } 


const initialSession:ISession = {
  loggedIn: false,
  userName: ''
}

const foo = () => {
  //return state
}

export const sessionState = createSlice({
    name: 'session', 
    initialState:initialSession, 
    reducers: {
            setUserName: (state, action) => {
                state.userName = action.payload // mutate the state all you want with immer
              },
            ddd:(state, action) =>{
               return state
            }  
           
            }
})



export const {setUserName,ddd} = sessionState.actions
export const sessionStateReducer = sessionState.reducer
export default sessionState

