import React, { FunctionComponent, useEffect } from "react";

import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { Leftbar } from "./components/leftbar/Leftbar";

import Spinner from "./components/spinner/Spinner";
import store from "./store";
import { selectSessionChecking,selectSessionLogin, selectUserChanged } from './store/system/sessionState';
import { setUserName,setUserChanged } from "./store/system/sessionState";
//import SystemStateSlice from './store/system/SystemState';

import GoodsCard from "./db/classes/GoodsCardClass";
import { ViewGoods } from "./db/classes/GoodsCardClass";
import Login from "./components/login/Login";
import { useSelector } from "react-redux";

import { checkSession} from "./components/CouchFunc";
import {initDB,reinitDB} from "./store/system/dbState"
import CatForm from "./db/CatForm";
import DocForm from './db/DocForm';
import { ViewOrder } from './db/classes/BuyerOrderClass';

const App: FunctionComponent = () => {
  const logged: boolean = useSelector(selectSessionLogin);
  const sessionCheking: boolean = useSelector(selectSessionChecking);
  const userChanged:boolean = useSelector(selectUserChanged);

 console.log('logged:'+logged+'-checking:'+sessionCheking+'-changed:'+userChanged);

 if (userChanged && logged) {
  console.log('dbdoc to rebuild (todo!!!)');
  //store.dispatch(reinitDB)
  store.dispatch(setUserChanged(false))
 }


  useEffect(() => {
    checkSession();
  }, []);

  
    var View = new GoodsCard("9999");
  //const dispatch=useDispatch();

  if (sessionCheking)
    return (
      <Spinner show={true} />
    )
  
  if (!logged)
      return (
        <Login />
      )

return (
    <div className="App">
      
          <Navbar title="Коло 2"> </Navbar>
          <div className="restApp">
            <Leftbar>
              <p>111</p> <p>222-222-4444</p>{" "}
            </Leftbar>
            <div className="workzone">
              <button
                onClick={() => {
                  store.dispatch(
                    setUserName("" + Math.round(Math.random() * 1000))
                  );
//                  console.log(store.getState());
                }}>
                22222
              </button>
              <DocForm _id="doc.buyers_order|78f80230-2374-11eb-960e-0328174f068d" ViewForm={ViewOrder} />
            </div>
          </div>
        </div>
      
  );
};

export default App;
