
import React from 'react'
import CatCard from '../dbclass';


   
// interface IGoodsCard extends CatCard  {
//     priceValue?:number;
// }

class GoodsCard extends CatCard{
    /**
     * The price. 
     */
    price:number = 0 //aaaa
    constructor(id:string=''){
        super('goods',id)
    }

}

export const ViewGoods =(props:any)=>{
    const CatObj = props.cls as GoodsCard
    return(
        <div>
           <h1>={CatObj.id}=</h1> 
        </div>
    )
}


export default GoodsCard

    

 
