import { _DBSERVER_ } from "./constants";
import store from "../store";
import { setUserName, setLogged, setSessionChecking } from "../store/system/sessionState";

type CBFunction = (props: any) => any;

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
        store.dispatch(setLogged(true));
        store.dispatch(setUserName(dataObject.name));
        console.log(store.getState());
      } else {
        store.dispatch(setLogged(false));
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
          store.dispatch(setLogged(true))
          store.dispatch(setUserName(dataObject.userCtx.name))
          }
      }
      store.dispatch(setSessionChecking(false))
    })

};

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

  fetch(_DBSERVER_ + "/" + api, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        if (callbackErr) callbackErr(response);
        console.log("Something went wrong ... in fetch");
      }
    })
    .then((data) => {
      if (callbackOK) callbackOK(data);
//      console.log("=auth respons=:" + JSON.stringify(data));
    })
    .catch((error) => console.log("=Error=:" + error));
};
