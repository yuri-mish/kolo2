import React from 'react'
import Catalog,{dbSourceType} from '../dbclass';

export class Partner extends Catalog{
    /**
     * The price. 
     */
    price:number = 0 //aaaa
    constructor(uuid:string=''){
        super( 'cat.partners','Контрагент', uuid)
    }
}

export class PartnerList {
     list:Partner[]=[]
     load = (source:dbSourceType)=>{

     }
}



