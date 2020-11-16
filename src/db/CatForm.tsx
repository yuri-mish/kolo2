import React, { FunctionComponent }  from 'react'
import { Button } from '@material-ui/core';
import Catalog from './dbclass';


import { getDoc } from '../components/CouchFunc';

type catObject = {
    catObject?:Catalog,
    _id?:string
}

 const CatForm:FunctionComponent<catObject> = (props)=>{
     if(!props.catObject){
        getDoc('20874006-c8c1-11e9-8109-00155dcccf0a')

     }
    return (
        
        <div>
            <Button>ffff</Button>
            {props.children}
        </div>
    )
} 

export default CatForm;