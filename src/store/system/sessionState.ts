import Cookies from 'universal-cookie';
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { createSelector } from 'reselect';



const cookies = new Cookies();

export interface ISession  {
  loggedIn: boolean,
  userChanged:boolean,
  sessionCheking:boolean,
  userName: string,
  roles:string[],
  userOptions:{
    docDbName:string,
    catDbName:string,
    suffix:string,
    departament:string
    
}
} 


const initialSession:ISession = {
  loggedIn: false,
  userChanged:false,
  sessionCheking:true,
  userName: cookies.get('uname'),
  roles:[],
  userOptions:{
    docDbName:'doc',
    catDbName:'ram',
    suffix:'',
    departament:''
}
}

// const setLogoutThunk = createAsyncThunk(
//   'session/logoutAsync',
//   async ()=>{}
// )

export const sessionState = createSlice({
    name: 'session', 
    initialState:initialSession, 
    reducers: {
            setUserName: (state, action) => {
              if (state.userName !== action.payload) {
                  state.userChanged = true;
                  console.log ('User changed:'+state.userName+'=>'+action.payload)
                  cookies.set('uname',action.payload,{maxAge: 8640000}) // Will expire after 3 month.)
               }
              state.userName = action.payload
              },
              setUserChanged:(state,action) =>{
                state.userChanged = action.payload
              }, 
              setLogged:(state,action) =>{
                console.log('logging:'+action.payload)
                state.loggedIn = action.payload
              
               }, 
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
                    case "branch":
                        state.userOptions.departament = pair[1];break;
                        }  

                })
                state.roles = _roles
              }    
           
            }
})



export const {setUserName,setLogged,setSessionChecking,setUserRoles,setUserChanged} = sessionState.actions
export const sessionStateReducer = sessionState.reducer

const selSessionUserName = (state:RootState)=>state.session.userName; 
const selSessionUserChanged = (state:RootState)=>state.session.userChanged; 
const selSessionChecking = (state:RootState)=>state.session.sessionCheking; 
const selSessionLogin = (state:RootState)=>state.session.loggedIn; 
const selSessionUserRoles = (state:RootState)=>state.session.roles; 

export const selectSessionUserName = createSelector(
  selSessionUserName,
  (UserName:string)=> UserName
)
export const selectSessionChecking = createSelector(
  selSessionChecking,
  (sessionCheking:boolean)=> sessionCheking
)
export const selectSessionLogin = createSelector(
  selSessionLogin,
  (LoggedIn:boolean)=> {
      return LoggedIn}
)
export const selectUserChanged = createSelector(
  selSessionUserChanged,
  (userChanged:boolean)=> userChanged
)
export const selectUserRoles = createSelector(
  selSessionUserRoles,
  (roles:string[])=> roles
)

 
export default sessionState

