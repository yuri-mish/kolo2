import { createSlice } from "@reduxjs/toolkit";

export interface ISession  {
  loggedIn: boolean,
  sessionCheking:boolean,
  userName: string,
  roles:string[]
 } 


const initialSession:ISession = {
  loggedIn: false,
  sessionCheking:true,
  userName: '',
  roles:[]
}

export const sessionState = createSlice({
    name: 'session', 
    initialState:initialSession, 
    reducers: {
            setUserName: (state, action) => {
              state.userName = action.payload 
              // mutate the state all you want with immer
              },
              setLogged:(state,action) =>{
                state.loggedIn = action.payload
                if (!action.payload){
                  state.userName = '' 
                  state.roles = []
                }
              } , 
              setSessionChecking:(state,action) =>{
                state.sessionCheking = action.payload
              },
              setUserRoles:(state,action) =>{
                state.roles = action.payload
              }    
           
            }
})



export const {setUserName,setLogged,setSessionChecking,setUserRoles} = sessionState.actions
export const sessionStateReducer = sessionState.reducer


export default sessionState

