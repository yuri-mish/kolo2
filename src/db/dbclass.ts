import {v4 as guid} from 'uuid';

declare type IDocCouch  = {
    _id:string,
    _rev:string,
    ref:string|undefined,
    class_name:string,
    deleted:boolean
    }

  abstract class DBItem implements IDocCouch{
    /**
     * external reference
     */
    ref:string
    _rev:string = ''
    class_name:string
    deleted = false

    constructor( class_name:string, ref:string|undefined = undefined ){
      this.ref = (!ref) ? guid() : ref
      this.class_name = class_name
    }
    public get _id() : string {
      return this.class_name+'|'+ this.ref ;
    }
    public set _id(value:string)  {
      var splits = value.split('|')
      this.class_name = splits[0]
      this.ref =splits[1]
    }

    save = ()=>{}

  }

  abstract class Catalog extends DBItem {
    kod:string

    constructor( class_name:string, uuid:string|undefined = undefined ){
      super(class_name,uuid)
      this.kod = ''
    }
  } 
  export abstract class Document extends DBItem {
    date_doc:number
    number_doc:string
    constructor( class_name:string, uuid:string|undefined = undefined ){
      super(class_name,uuid)
      this.number_doc = ''
      this.date_doc = Date.now() 
    }
  } 

  export default Catalog
  