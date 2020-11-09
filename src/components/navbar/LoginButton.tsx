import React, { useState } from "react";
import { Button, ClickAwayListener, createStyles, Grow, makeStyles, MenuItem, MenuList, Paper, Popper, Theme } from "@material-ui/core";
import AccountBox from "@material-ui/icons/AccountBox";
import { useSelector } from "react-redux";
import { selectSession } from '../../store';

export const LoginButton: React.FC = () => {

  type MouseEvent = React.MouseEvent<HTMLLIElement, MouseEvent>;
  type InputEvent = React.ChangeEvent<HTMLInputElement>;
  type KeyboardEvent = React.KeyboardEvent<HTMLUListElement>;

  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const session = useSelector(selectSession)
  let userName: string = session.userName;
  let logged:boolean = session.loggedIn; //selectSessionUserName)
  //    let  userName:string = useSelector ((state:RootState) => state.session.userName)//selectSessionUserName)




const useStyles = makeStyles((theme: Theme)=>createStyles({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(0,2),
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
  //const curr = Button.current
//  if (curr && curr.contains(event.target)) {
     return;
//  }
}

  const classes = useStyles({});
  return (
    <div className={classes.root}>
    <Button
      /*   aria-controls={uMenuOpen ? 'menu-list-grow' : undefined} */
      
      onClick={handleToggle}
      aria-haspopup="true"
      className={classes.button}>
        
      <AccountBox color={logged?"inherit":"error"} />
       {logged?userName:'вхід'}
    </Button>
    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
    {({ TransitionProps, placement }) => (
      <Grow
        {...TransitionProps}
        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Grow>
    )}
    </Popper>
    </div>
  );
};
