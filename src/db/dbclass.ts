import { v4 as guid } from 'uuid';
export enum dbSourceType { Loacal, Remote }

export const mdb = {
  emptyRef: '00000000-0000-0000-0000-000000000000',
  schema: require('./schema.json')
}

declare type IField = {
  caption: string,
  isRef: boolean,
  length?: number,
  decPoints?: number
  class_name: string | any,
  value?: string | number | boolean | Date | undefined,
  obj?: {} | undefined
}

declare type IDocCouch = {
  _id: string,
  _rev: string,
  ref: string | undefined,
  class_name: string,
  fields: Record<string, IField>,
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
  classCaption = ''
  fields: Record<string, IField> = {};

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

  fillProperties = (source: Record<string, any>) => {
    const destProps = Object.getOwnPropertyNames(this.fields)
    const sourceProps = Object.getOwnPropertyNames(source)
    let hasProps: boolean

    destProps.forEach((element) => {
   
      hasProps = sourceProps.includes(element)
      if (hasProps) this.fields[element].value = source[element]
    })
    this._id = source._id
    if (source._rev) { this._rev = source._rev }
  }
}

export abstract class cCatalog extends DBItem {

  formObject:React.ReactNode
  formList:React.ReactNode

  constructor(class_name: string, classCaption: string, uuid: string | undefined = undefined) {
    super(class_name, classCaption, uuid)
    this.fields['kod'] = { caption: 'Код', class_name: 'string', isRef: false, value: '' }
    this.fields['name'] = { caption: 'Найменування', class_name: 'string', isRef: false, value: '' }
    Object.defineProperties(this, {
      kod: {
        set: (value) => { this.fields.kod.value = value },
        get: () => { return this.fields.kod.value }
      },
      name: {
        set: (value) => { this.fields.name.value = value },
        get: () => { return this.fields.name.value }
      },
    });
    addPropsFromScheme(this, class_name)
  }

  public get Caption() {
    return this.fields.name.value
  }

}


export abstract class cDocument extends DBItem {

  formObject:React.ReactNode
  formList:React.ReactNode
  constructor(class_name: string, classCaption: string, uuid: string | undefined = undefined) {
    super(class_name, classCaption, uuid)

    this.fields.number_doc = { caption: 'Номер', class_name: 'string', isRef: false, value: '' }
    this.fields.date = { caption: 'Дата', class_name: 'date', isRef: false, value: new Date(0) }
    //this.form = form
    Object.defineProperties(this, {
      number_doc: {
        set: (value) => { this.fields['number_doc'].value = value },
        get: () => { return this.fields.number_doc.value }
      },
      date: {
        set: (value) => { this.fields.date.value = value },
        get: () => { return this.fields.date.value }
      },
    });

    addPropsFromScheme(this, class_name)
  }

  public get Caption() {
    //  return '<имя класа>'
    return this.classCaption + ' ' + this.fields.number_doc.value + ' ' + this.fields.date.value
  }
}

const addPropsFromScheme = (o: DBItem, class_name: string) => {
  const fields = mdb.schema[class_name]?.fields as string[] | IField[]

  if (fields) {
    fields.forEach((elem: any) => {
      o.fields[elem.name] = elem
      o.fields[elem.name].value = undefined
      if (elem.isRef) {
        o.fields[elem.name].value = mdb.emptyRef
        o.fields[elem.name].obj = undefined
        Object.defineProperty(o, elem.name, {
          set: (value) => { o.fields[elem.name].obj = value },
          get: () => { return o.fields[elem.name].obj }
        });
      } else
        Object.defineProperty(o, elem.name, {
          set: (value) => { o.fields[elem.name].value = value },
          get: () => { return o.fields[elem.name].value }
        });

    })
  }
}




