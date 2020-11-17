
import React from 'react'
import Catalog from '../dbclass';
import CatForm from '../CatForm';
import { FormGroup, FormLabel,FormControl, Input, OutlinedInput, Dialog } from '@material-ui/core';
import { TextField } from '@material-ui/core';



   
// interface IGoodsCard extends CatCard  {
//     priceValue?:number;
// }


     class GoodsItem extends Catalog{
    /**
     * The price. 
     */
    name=''
    fullName=''
    price:number = 0 //aaaa
    constructor(uuid:string=''){
        super( 'cat.nom', uuid)
    };

    
}

export const ViewGoods =(props:any)=>{

let catObject = props.catObject
    
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
       let id:string  = event.target.id as keyof GoodsItem
        catObject[id] = event.target.value ;
      };
    
      return(
        <div>
           {JSON.stringify(catObject)} 
           <h1>={catObject._id}=</h1> 
           <div>
               <TextField  label="Код" defaultValue={catObject.id} onChange={handleChange}/>
               <TextField  label="Найменування" defaultValue={catObject.name} onChange={handleChange}/>
           </div>
        </div>   
    )
}


export default GoodsItem

    

 
