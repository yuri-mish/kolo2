import React, { FunctionComponent, useState } from "react";
import { Button, TextField, createStyles, makeStyles} from "@material-ui/core";




import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";


import "./Login.css";

import {authentification} from '../CouchFunc';



 
const Login:FunctionComponent  = () => {

  type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
  type InputEvent = React.ChangeEvent<HTMLInputElement>;
  type KeyboardEvent = React.KeyboardEvent<HTMLUListElement|HTMLInputElement|HTMLDivElement>;

    const [userName, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isError,setError] = useState(false)
    

  const handleChangeUsername = (event:InputEvent) => { setName(event.target.value) }
  const handleChangePassword = (event:InputEvent) => { setPassword(event.target.value) }

  const handleSubmit = (event?:ButtonEvent) => {
        authentification(userName,password,()=>{
          setError(true)
        });
   };



  const useStyles = makeStyles(()=>
    createStyles({
      
      formControl:{
        marginBottom:"1rem",
        width:"100%",

      },

      textControl:{
        marginBottom:"1rem",
        width:"100%"
      },

      error:{
        color: 'red',
        'font-size': '0.1rem'
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
    
    const KeybEnter = (event:KeyboardEvent)=>{
      const ENTER:number = 13;
 
      if (event.keyCode ===ENTER)
        handleSubmit()

    }

    const classes = useStyles({});
    return (
      <Dialog disableBackdropClick disableEscapeKeyDown open={true} onKeyUp={KeybEnter}>
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

            {isError && <p className='err'>   невірний логін чи пароль</p> }

            <Button onClick={handleSubmit} variant="contained" autoCapitalize="false" className={classes.submitbutton}> Надіслати </Button>

          </FormControl>
        </form>
      </DialogContent>
    </Dialog>

    )
  
}
export default Login;
