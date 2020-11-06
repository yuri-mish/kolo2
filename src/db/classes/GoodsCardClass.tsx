
import React from 'react'
import Catalog from '../dbclass';


   
// interface IGoodsCard extends CatCard  {
//     priceValue?:number;
// }

class GoodsItem extends Catalog{
    /**
     * The price. 
     */
    price:number = 0 //aaaa
    constructor(uuid:string=''){
        super( 'cat.goods', uuid)
    }

}

export const ViewGoods =(props:any)=>{
    const CatObj = props.cls as GoodsItem
    return(
        <div>
           <h1>={CatObj._id}=</h1> 
        </div>
    )
}


export default GoodsItem

    

 
