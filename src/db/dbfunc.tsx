import BuyerOrder from "./classes/BuyerOrderClass"
import { cCatalog, cDocument } from "./dbclass"

export const createObjectByName = (class_name:string):cDocument|cCatalog|undefined=>{ 
    switch (class_name){
      case 'doc.buyers_order':
        return new BuyerOrder() 
    }
    return undefined
  }
  