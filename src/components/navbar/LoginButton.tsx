import React, { useState } from "react";
import { Button, ClickAwayListener, createStyles, makeStyles, MenuItem, MenuList, Paper, Popper, Theme } from "@material-ui/core";
import AccountBox from "@material-ui/icons/AccountBox";
import { useSelector } from "react-redux";

import {logout} from '../CouchFunc';
import { selectSessionUserName, selectSessionLogin } from './../../store/system/sessionState';

export const LoginButton: React.FC = () => {

  type KeyboardEvent = React.KeyboardEvent<HTMLUListElement>;

  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  let userName: string = useSelector(selectSessionUserName);
  let logged:boolean = useSelector(selectSessionLogin); //selectSessionUserName)
  
const useStyles = makeStyles((theme: Theme)=>createStyles({
  root: {
    display: 'flex',
  },

  mpopper: {
    display: 'flex',
    marginRight: '2rem',
    borderColor:'#004600'   
  },

  formControl:{
    marginBottom:"1rem",
    width:"100%",
  },
  
  button: {
    color: '#e0e0e0',
    textTransform: 'none',
    '&:hover':{
        color: '#fff',
      }
   }
})
)

const handleToggle = () => {
  setOpen((prevOpen) => !prevOpen);
};

function handleListKeyDown(event:KeyboardEvent) {
  if (event.key === 'Tab') {
    event.preventDefault();
    setOpen(false);
  }
}

const handleClose = (event:any) => {
  let id=''
  if (anchorRef.current){
   if(anchorRef.current.contains(event.target)) {
    return;
    }
    id = event.target.id; 
  }
  switch (id){
    case 'logout': 
        logout();
      break
    default:
  }

  setOpen(false);
}


  const classes = useStyles({});
  return (
    <div ref={anchorRef} >
    <Button
      /*   aria-controls={uMenuOpen ? 'menu-list-grow' : undefined} */
      onClick={handleToggle}
      aria-haspopup="true"
      className={classes.button}>
        
      <AccountBox color={logged?"inherit":"error"} />
       {logged?userName:'вхід'}
    </Button>
    <div className={classes.root}>
    <Popper  className={classes.mpopper} open={open} anchorEl={anchorRef.current} role={undefined}   >
           <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
              <MenuItem id="profile" disabled={true} onClick={handleClose}>Profile</MenuItem>
              <MenuItem id="logout"  onClick={handleClose}>Вихід</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
    </Popper>
    </div>
    </div>
  );
};
