import React from 'react';

import './App.css';
import { Navbar } from './components/navbar/Navbar';
import { Leftbar } from './components/leftbar/Leftbar';

import Spinner from './components/spinner/Spinner';
import store  from './store';
import {SystemStateSlice} from './store/system/SystemState';
//import SystemStateSlice from './store/system/SystemState';
import  GoodsCard from './db/classes/GoodsCardClass';
import {ViewGoods}  from './db/classes/GoodsCardClass';





function App() {
  var View = new GoodsCard('9999');
  //const dispatch=useDispatch();
  return (
    <div className="App">

      <Navbar> </Navbar>
      <div className="restApp">
        <Leftbar><p>111</p> <p>222-222-4444</p> </Leftbar>
        <div className="workzone">
          <Spinner show={false} />
          <button onClick={()=>{
              store.dispatch(SystemStateSlice.actions.setUserName(""+Math.round(Math.random()*1000)))
              console.log(store.getState());
              }}>22222</button>

              <ViewGoods cls={View}/>

       </div>
      </div>
    </div>
  );
}

export default App;
