import React,{FunctionComponent, useEffect}  from 'react'
import {LoginButton} from './LoginButton'




import './Navbar.css'
import store from '../../store'
import { createStyles, makeStyles, Theme } from '@material-ui/core'




type NavbarProps = {
    title?:string,
}



export const  Navbar:FunctionComponent<NavbarProps> = (props)=>{

  const [st1, setuSt1] = React.useState('lll');

  

   useEffect(()=>{

    console.log('NavBar -> usEffect')
   }, []);
   
return(
  <div className="navbar">
    {props.children}
    <div className="rightToolbar">
      <LoginButton/>   
    </div>
  </div>
  )
}
