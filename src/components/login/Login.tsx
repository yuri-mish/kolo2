import React, { useState } from "react";
import { Button, TextField,FormLabel, createStyles, withStyles, makeStyles, Theme} from "@material-ui/core";




import Dialog from "@material-ui/core/Dialog";
//import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
//import Select from "@material-ui/core/Select";
//import InputLabel from "@material-ui/core/InputLabel";
//import Input from "@material-ui/core/Input";

import "./Login.css";

import {_DBSERVER_} from '../constants';
import store from './../../store/index';
import { setLogged, setUserName } from "../../store/system/sessionState";


 
const Login  = () => {

  type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
  type InputEvent = React.ChangeEvent<HTMLInputElement>;

    const [userName, setName] = useState('')
    const [password, setPassword] = useState('')

    

  const handleChangeUsername = (event:InputEvent) => { setName(event.target.value) }
  const handleChangePassword = (event:InputEvent) => { setPassword(event.target.value) }

  const handleSubmit = (event:ButtonEvent) => {
  
    const sendData={
      name: userName,
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

  event.preventDefault();

  console.log('=sendData'+requestOptions.body) 

  fetch(_DBSERVER_+'/_session',requestOptions)
    .then(response => {
           if(response.ok) {
             return(response.json()
                );

           } else {
            //this.setState({error:true});
            throw new Error('Something went wrong ...');
          }
           })
           .then(data => {
            //this.setState({error:false});
            console.log('=auth respons=:'+JSON.stringify(data))
            store.dispatch(setLogged(true)) 
            store.dispatch(setUserName(data.name)) 

            //this.props.setlog(true,data) 

                }      
              )
         .catch(error => console.log( '=Error=:'+error));
  };

  const useStyles = makeStyles(({ spacing }: Theme)=>
    createStyles({
      
      formControl:{
        marginBottom:"1rem",
        width:"100%",

      },

      textControl:{
        marginBottom:"1rem",
        width:"100%",
        "&$focused": {
          color: "yellow"
        }
      },
      submitbutton:{
   
        marginTop:"1rem",
        backgroundColor: "#192c11",
        color:"#F0F0F0",
        '&:hover': {
          background: "#007000",
          color:"#FFF",

        }
      }  
    })
    )
    

    const classes = useStyles({});
    return (
    
            <Dialog disableBackdropClick disableEscapeKeyDown open={true}>
              <DialogContent >
              <p> Вкажіть логін та пароль </p>
                <form className="container" >
                  <FormControl className={classes.formControl} >
                    <TextField 
                      className={classes.textControl}
                      variant="outlined" 
                      id="username"
                      label="користувач"
                      onChange={handleChangeUsername}
                      value={userName}
                    />
                    <TextField
                      className={classes.textControl}
                      type="password"
                      variant="outlined"
                      autoComplete="disabled"
                      id="password"
                      label="пароль"
                      onChange={handleChangePassword}
                      value={password}
                    />
     
                    <Button onClick={handleSubmit}  variant="contained" autoCapitalize="false" className={classes.submitbutton}> Надіслати </Button>
    
                  </FormControl>
                </form>
              </DialogContent>
            </Dialog>
  
    )
  
}
export default Login;
