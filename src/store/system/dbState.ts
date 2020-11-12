import { createSlice } from "@reduxjs/toolkit";
import { Pouchdb } from 'pouchdb';

export interface IBases  {
  catdb: Pouchdb.DataBase,
  sessionCheking:boolean,
  userName: string,
  roles:string[],
  userOptions:{
    docDbName:string,
    catDbName:string,
    suffix:string,
    
}
} 


const initialSession:ISession = {
  loggedIn: false,
  sessionCheking:true,
  userName: '',
  roles:[],
  userOptions:{
    docDbName:'doc',
    catDbName:'ram',
    suffix:'',
}
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
                let pair:string[]
                let _roles:string[] = []  
                // eslint-disable-next-line array-callback-return
                action.payload.forEach((element:string) => {
                  
                // }); 
                // state.roles = action.payload.map((elem:string)=>{
                  pair = element.split(':')
                  if (pair.length === 1) return _roles.push(element)
                  switch (pair[0]){
                    case "docDbName":
                      state.userOptions.docDbName = pair[1];break;
                    case "catDbName":
                      state.userOptions.catDbName = pair[1];break;
                    case "suffix":
                      state.userOptions.suffix = pair[1];break;
                  }  

                })
                state.roles = _roles
              }    
           
            }
})



export const {setUserName,setLogged,setSessionChecking,setUserRoles} = sessionState.actions
export const sessionStateReducer = sessionState.reducer

export default sessionState

