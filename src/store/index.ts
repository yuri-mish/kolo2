import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {sessionStateReducer} from './system/sessionState'
import {dbStateReducer} from './system/dbState'
//import { createSelector } from 'reselect'

 const middleware = [
   ...getDefaultMiddleware(),
   /*YOUR CUSTOM MIDDLEWARES HERE*/
 ];
export const rootReducer = combineReducers({
  session:sessionStateReducer,
  db:dbStateReducer,
})
const store = configureStore({
  reducer: rootReducer,
   middleware:middleware
})

export type AppDispatch = typeof store.dispatch

export default store;

export type RootState = ReturnType<typeof rootReducer>
// export const selectSession = (state:RootState)=>state.session;  //export const selectSessionUserName = (state:RootState)=>state.session.userName
// export const selectSessionChecking = (state:RootState)=>state.session.sessionCheking; 
// export const selectSessionLogin = (state:RootState)=>state.session.loggedIn; 
 


