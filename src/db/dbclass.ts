import { v4 as guid } from 'uuid';

export enum dbSourceType {Loacal,Remote}

declare type IDocCouch = {
  _id: string,
  _rev: string,
  ref: string | undefined,
  class_name: string,
 
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
    

  constructor(class_name: string, classCaption: string, ref: string | undefined = undefined) {
    this.ref = (!ref) ? guid() : ref
    this.class_name = class_name
    this.classCaption = classCaption
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

}

abstract class Catalog extends DBItem {
  kod: string
  name: string

  constructor(class_name: string, classCaption:string, uuid: string | undefined = undefined) {
    super(class_name, classCaption, uuid)
    this.kod = ''
    this.name = ''
  }

  public get Caption(){
    return this.name
  }

}


export abstract class Document extends DBItem {
  date: Date
  number_doc: string
  constructor(class_name: string, classCaption:string, uuid: string | undefined = undefined) {
    super(class_name, classCaption, uuid)
    this.number_doc = ''
    this.date = new Date(0)
  }

  public get Caption(){
    return this.classCaption+' '+this.number_doc+' '+this.date
  }
}

export default Catalog
