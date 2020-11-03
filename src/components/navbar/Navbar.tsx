import React,{FunctionComponent, useEffect}  from 'react';
import './Navbar.css'
import store from '../../store'



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
    console.log('=')
   }, [])
   
return(
  <div className="navbar">
    {props.children}
<button>{st1}</button>

  </div>
  )
}
