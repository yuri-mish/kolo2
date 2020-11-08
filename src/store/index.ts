import { configureStore } from '@reduxjs/toolkit'
//import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'


//import {sessionStateReducer} from './system/sessionState'



// const middleware = [
//   ...getDefaultMiddleware(),
//   /*YOUR CUSTOM MIDDLEWARES HERE*/
// ];

const store = configureStore({
  reducer: rootReducer,
   //middleware:middleware
})

export type AppDispatch = typeof store.dispatch

export default store;
