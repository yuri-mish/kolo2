import React,{FunctionComponent}  from 'react';
import './Leftbar.css'

type LeftBarProps = {
    title?:string,
}


export const  Leftbar:FunctionComponent<LeftBarProps> = (props)=>{

return(
  <div className="leftbar">
    {props.children}
  </div>
  )
}
