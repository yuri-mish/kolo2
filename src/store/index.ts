import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import {SystemStateSlice} from './system/SystemState'

const _reducer = SystemStateSlice.reducer;

const reducer = combineReducers({
    reduser:_reducer,
})

const store = configureStore({
  reducer:reducer,
})

export default store;