import {v4 as guid} from 'uuid';

declare type IDocCouch  = {
    _id:string,
    ref:string|undefined,
    class_name:string
  }

  abstract class DBItem implements IDocCouch{
    /**
     * external reference
     */
    ref:string
    _rev:string|undefined = undefined
    class_name:string

    constructor( class_name:string, ref:string|undefined = undefined ){
      this.ref = (!ref) ? guid() : ref
      this.class_name = class_name
    }
    public get _id() : string {
      return this.class_name+'|'+ this.ref ;
    }

  }

  abstract class Catalog extends DBItem {
    kod:string
    constructor( class_name:string, uuid:string|undefined = undefined ){
      super(class_name,uuid)
      this.kod = ''
    }
  } 

  export default Catalog