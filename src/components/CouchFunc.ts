import { _DBSERVER_,_DATABASE_,_DATABASE_SUB_ } from "./constants";
import store from "../store";
import { setUserName, setLogged, setSessionChecking,setUserRoles } from "../store/system/sessionState";
import Pouchdb from 'pouchdb'
import PouchdbFind from 'pouchdb-find';


type CBFunction = (props: any) => any;
Pouchdb.plugin(PouchdbFind)

export const authentification = (login: string, password: string, error?: CBFunction) => {
  const sendData = {
    name: login,
    password: password,
  };

  dbfetch(
    "POST", "_session",
    sendData,
    (dataObject) => {
      if (dataObject) {
        store.dispatch(setLogged(true))
        store.dispatch(setUserName(dataObject.name))
        store.dispatch(setUserRoles(dataObject.roles))
        console.log(store.getState())
      } else {
        store.dispatch(setLogged(false))
      }
      console.log("=auth respons=:" + JSON.stringify(dataObject));
    },
    () => {
      console.log("(in callback function) Something went wrong ... in logging fetch")
      if (error) error(null);

    }
  );
};

export const logout = () => {
  dbfetch("DELETE", "_session", {}, () => {
    store.dispatch(setLogged(false));
  });
};

export const checkSession = () => {
  dbfetch("GET", "_session", {},
    (dataObject) => {
      if (dataObject) {
        if (dataObject.userCtx.name !== null) {
          store.dispatch(setUserName(dataObject.userCtx.name))
          store.dispatch(setUserRoles(dataObject.userCtx.roles))
          store.dispatch(setLogged(true))
        }
      }
      store.dispatch(setSessionChecking(false))
    })

};


export const dbinit=()=> {
  
  const userOptions = store.getState().session.userOptions;
  let path = _DBSERVER_+'/'+_DATABASE_+_DATABASE_SUB_+'_';
  let catname = path+userOptions.catDbName
  let docname = path+userOptions.docDbName
  if (userOptions.suffix !== '') {
        docname = docname+'_'+userOptions.suffix;
    }
 // if (!catdb) catdb = new Pouchdb('cat')
  let docdb = new Pouchdb('doc')
  let c_docdb = new Pouchdb(docname)
  let c_catdb = new Pouchdb(catname)

  
}

export const dbfetch = (
  method: string,
  api: string,
  payload?: {},
  callbackOK?: CBFunction,
  callbackErr?: CBFunction
) => {
  const requestOptions: RequestInit = {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (method !== 'GET')
    requestOptions.body = JSON.stringify(payload);


   console.log (_DBSERVER_ + "/" + api) 
  fetch(_DBSERVER_ + "/" + api, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        if (callbackErr) callbackErr(response);
//        console.log("Something went wrong ... in fetch");
      }
    })
    .then((data) => {
      if (data && callbackOK) callbackOK(data);
    })
    .catch((error) => console.log("=Error=:" + error));
};
