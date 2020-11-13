import { createSlice } from "@reduxjs/toolkit";
import Pouchdb from 'pouchdb';
import { _DBSERVER_,_DATABASE_SUB_,_DATABASE_ } from './../../components/constants';

export interface IBases  {
    catdb: PouchDB.Database|null,
    docdb: PouchDB.Database|null,
    cat_r_db?:PouchDB.Database|null,
    doc_r_db?:PouchDB.Database|null,
  } 


const initialSession:IBases = {
    catdb: null,
    docdb: null,
    cat_r_db:null,
    doc_r_db:null,
  }


export const dbState = createSlice({
    name: 'db', 
    initialState:initialSession, 
    reducers: {
            initDB: (state, action) => {
                state.catdb = new Pouchdb('cat')
                state.docdb = new Pouchdb('doc')
                state.doc_r_db = new Pouchdb(_DBSERVER_+'/'+_DATABASE_+_DATABASE_SUB_+'_doc_'+action.payload.suffix) 
                state.cat_r_db = new Pouchdb(_DBSERVER_+'/'+_DATABASE_+_DATABASE_SUB_+'_ram') 
                console.log(state.catdb,state.docdb,state.cat_r_db,state.doc_r_db)
              },
            reinitDB:(state)=>{
                let db  = state.docdb;
                db?.destroy().then(()=>state.docdb = new Pouchdb('doc'))
            }  
           
            }
})



export const {initDB,reinitDB} = dbState.actions
export const dbStateReducer = dbState.reducer

export default dbState

