
import React from 'react'
import Catalog from '../dbclass';
import CatForm from '../CatForm';


   
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
    }

}

export const ViewGoods =(props:any)=>{
    const CatObj = props.cls as GoodsItem
    return(
        <CatForm>
           <h1>={CatObj._id}=</h1> 
        </CatForm>
    )
}


export default GoodsItem

    

 
