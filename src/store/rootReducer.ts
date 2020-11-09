import { combineReducers } from '@reduxjs/toolkit'
import {sessionStateReducer,ISession} from './system/sessionState'

// interface RootState {
//     session: ISession,
// }

//+++

const rootReducer = combineReducers({
    session:sessionStateReducer,
})
export type RootState = ReturnType<typeof rootReducer>
export const selectSessionUserName = (state:RootState)=>state.session.userName
export default rootReducer