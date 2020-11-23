import { v4 as guid } from 'uuid';

export enum dbSourceType {Loacal,Remote}

//interface IIndexable<T = any> { [key: string]: T }

declare type IField={
  
  caption:string,
  isRef:boolean,
  length?:number,
  decPoints?:number

  class_name:string|any,
  value?:any,

  }


declare type IDocCouch = {
  _id: string,
  _rev: string,
  ref: string | undefined,
  class_name: string,

  fields:Record<string,IField>,
 
  deleted: boolean
}

abstract class DBItem implements IDocCouch {
  /**
   * external reference
   */
  ref: string
  _rev: string = ''
  class_name: string
  deleted = false
  classCaption=''
  fields : Record<string,IField> = { };


  constructor(class_name: string, classCaption: string, ref: string | undefined = undefined) {
    this.ref = (!ref) ? guid() : ref
    this.class_name = class_name
    this.classCaption = classCaption
    this.fields = {}
  }
  
  public get _id(): string {
    return this.class_name + '|' + this.ref;
  }

  public set _id(value: string) {
    var splits = value.split('|')
    this.class_name = splits[0]
    this.ref = splits[1]
  }

  save = () => { }

  fillProperties = (source:{})=>{
    const myProps = Object.getOwnPropertyNames(this)
    const sourceProps = Object.getOwnPropertyNames(source)

    let hasProps:string|undefined = undefined

    myProps.forEach((element)=>{
      console.log(element)
      //  hasProps = sourceProps.find(element)


    //   if (!sourceProps.)
    // 
    } ) 

  }

}

abstract class Catalog extends DBItem {
 
  constructor(class_name: string, classCaption:string, uuid: string | undefined = undefined) {
    super(class_name, classCaption, uuid)
    this.fields.kod = {
      caption:'Код',
      class_name:'string',
      isRef:false,
      value:''
    }
    this.fields.name = {
      caption:'Найменування',
      class_name:'string',
      isRef:false,
      value:''
    }
  }

  public get Caption(){
    return ''//;this.fields['name' as keyof IField].name
  }

}


export abstract class Document extends DBItem {

 
  constructor(class_name: string, classCaption:string, uuid: string | undefined = undefined) {
      super(class_name, classCaption, uuid)
    
    this.fields.number_doc = {
      caption:'Номер',
      class_name:'string',
      isRef:false,
      value:''
    }
    this.fields.date = {
      caption:'Дата',
      class_name:'date',
      isRef:false,
      value :new Date(0)
    }
  }

  public get Caption(){
  //  return '<имя класа>'
    return this.classCaption+' '+this.fields.number_doc.value+' '+this.fields.date.value
  }
}

export default Catalog
