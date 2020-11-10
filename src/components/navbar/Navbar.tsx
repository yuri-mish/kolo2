import React,{FunctionComponent}  from 'react'
import {LoginButton} from './LoginButton'




import './Navbar.css'
//import store from '../../store'
//import { createStyles, makeStyles, Theme } from '@material-ui/core'




type NavbarProps = {
    title?:string,
}



export const  Navbar:FunctionComponent<NavbarProps> = (props)=>{

return(
  <div className="navbar">
    {props.children}
    <div className="rightToolbar">
      <LoginButton/>   
    </div>
  </div>
  )
}
