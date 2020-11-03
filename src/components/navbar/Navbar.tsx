import React,{FunctionComponent, useEffect}  from 'react';
import {Button} from '@material-ui/core';


import './Navbar.css'
import store from '../../store'
import  AccountBox  from '@material-ui/icons/AccountBox';



type NavbarProps = {
    title?:string,
}


export const  Navbar:FunctionComponent<NavbarProps> = (props)=>{

  const [st1, setuSt1] = React.useState('lll');

  

   useEffect(()=>{
    store.subscribe(()=>{
     var st:string = store.getState().reduser.userName
     console.log(st);
     setuSt1(st)
})
    console.log('NavBar -> usEffect')
   }, [])
   
return(
  <div className="navbar">
    {props.children}
    <div className="rightToolbar">
                    <Button  
                   /*   aria-controls={uMenuOpen ? 'menu-list-grow' : undefined} */
                      aria-haspopup="true"
                      classes={{root:'button',label:'label'}}>
                         <AccountBox/> Name
                    </Button>
    </div>


  </div>
  )
}
