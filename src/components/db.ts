import {_DBSERVER_} from '../components/constants';
import store from '../store';
import { SystemStateSlice } from '../store/system/SystemState';

export const authentification=(login:string,password:string)=>{

    const sendData={
        name: login,
        password: password
      }

    const requestOptions:RequestInit = {
        method: 'POST',
        mode: 'cors',
        cache:'no-cache',
        credentials: 'include',
        headers: { 
                    'Content-Type': 'application/json'
                 },
        body: JSON.stringify(sendData)
      }
  
    console.log('=sendData'+requestOptions.body) 
  
    fetch(_DBSERVER_+'/_session',requestOptions)
      .then(response => {
             if(response.ok) {
               return(response.json()
                  );
  
             } else {
            //   this.setState({error:true});
            //   throw new Error('Something went wrong ...');
               console.log('Something went wrong ... in logging fetch');
        }
             })
             .then(data => {
//              this.setState({error:false});
              store.dispatch(SystemStateSlice.actions.setUserName(data.name))
              console.log(store.getState());
              console.log('=auth respons=:'+JSON.stringify(data)) 
//              this.props.setlog(true,data) 
  
                  }      
                )
           .catch(error => console.log( '=Error=:'+error));
};


