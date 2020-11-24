// import React from 'react'

import {cCatalog, dbSourceType} from '../dbclass'

export class Partner extends cCatalog {
    
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



