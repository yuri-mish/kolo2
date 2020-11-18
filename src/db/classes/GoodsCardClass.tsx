
import React from 'react'
import Catalog from '../dbclass';
import { TextField, makeStyles } from '@material-ui/core';



   
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

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft:'10px',
        paddingRight:'10px',

    },
}))

export const ViewGoods =(props:any)=>{

let catObject = props.catObject
    const classes = useStyles()
    
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
       let id:string  = event.target.id as keyof GoodsItem
        catObject[id] = event.target.value ;
      };
    
      return(
        <div className={classes.root}>
           <h1>={catObject._id}=</h1> 
           <div>
               <TextField style={{width:'25%'}} id="id" label="Код" defaultValue={catObject.id} onChange={handleChange}/>
               <TextField style={{width:'75%'}} id="name" label="Найменування" defaultValue={catObject.name} onChange={handleChange}/>
           </div>
        </div>   
    )
}


export default GoodsItem

    

 
