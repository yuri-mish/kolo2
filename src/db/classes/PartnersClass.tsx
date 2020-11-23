import React from 'react'
import Catalog,{dbSourceType} from '../dbclass';

export class Partner extends Catalog{
    /**
     * The price. 
     */
    price:number = 0 //aaa
    
    constructor(uuid:string=''){
        super( 'cat.partners','Контрагент', uuid)
        Object.defineProperties(this,{
            partnerRef:{
                value:'=Ref=',
                writable:true
              } ,
            partnerObj:{
                value:'=Obj=',
                writable:true
              } 

        })
    }
}

export class PartnerList {
     list:Partner[]=[]
     load = (source:dbSourceType)=>{

     }
}



