import { createSlice } from "@reduxjs/toolkit";
// import Pouchdb from 'pouchdb';
// import { _DBSERVER_,_DATABASE_SUB_,_DATABASE_ } from './../../components/constants';

export interface IBases  {

  } 


const initialSession:IBases = {

  }


export const dbState = createSlice({
    name: 'db', 
    initialState:initialSession, 
    reducers: {
            initDB: (state, action) => {
               
//                console.log(state.catdb,state.docdb,state.cat_r_db,state.doc_r_db)
              },
            reinitDB:(state)=>{
                
            }  
           
            }
})



export const {initDB,reinitDB} = dbState.actions
export const dbStateReducer = dbState.reducer

export default dbState

