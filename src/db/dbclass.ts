import {v4 as uuid} from 'uuid';

declare type IDocCouch  = {
    id?:string,
    class_name:string
  }

  abstract class CatCard implements IDocCouch {

    id:string
    class_name:string
    kod:string=''

    constructor(class_name:string,id:string){
        if (id==='') {
            id=uuid()
        }
            
        this.id = id;
        this.class_name = class_name;
    }

    
   

  } 

  export default CatCard