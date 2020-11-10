import React, { FunctionComponent, useEffect } from "react";

import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { Leftbar } from "./components/leftbar/Leftbar";

import Spinner from "./components/spinner/Spinner";
import store, { selectSession } from "./store";
import { setUserName } from "./store/system/sessionState";
//import SystemStateSlice from './store/system/SystemState';

import GoodsCard from "./db/classes/GoodsCardClass";
import { ViewGoods } from "./db/classes/GoodsCardClass";
import Login from "./components/login/Login";
import { useSelector } from "react-redux";

import { checkSession } from "./components/CouchFunc";
import { selectSessionChecking } from './store/index';

const App: FunctionComponent = () => {
  const logged: boolean = useSelector(selectSession).loggedIn;
  const sessionCheking: boolean = useSelector(selectSessionChecking);

  useEffect(() => {
    checkSession();
  }, []);

  var View = new GoodsCard("9999");
  //const dispatch=useDispatch();
  return (
    <div className="App">
      <Spinner show={false} />
      {!logged  && !sessionCheking && <Login />}
      {logged && (
        <div>
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
                  console.log(store.getState());
                }}>
                22222
              </button>

              <ViewGoods cls={View} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
