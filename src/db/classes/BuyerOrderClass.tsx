import React, { FunctionComponent, useEffect, useState } from "react";
import { Document } from "../dbclass";
import { Button, makeStyles, MenuItem, Select } from "@material-ui/core";
import  TextField from "@material-ui/core/TextField";
import {
  KeyboardDateTimePicker,
  } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Partner } from './PartnersClass';
import { getDoc } from "../../components/CouchFunc";

// interface IGoodsCard extends CatCard  {
//     priceValue?:number;
// }

class BuyerOrder extends Document {
    [key:string]: any
    /**
   * Контрагент.
   */
  partner: Partner|null
  constructor(uuid: string = "") {
    super("doc.buyer_order", uuid);
    this.partner = null
  }
}

const seStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
}));

export const ViewOrder: FunctionComponent = (props: any) => {
  let docObject = props.docObject as BuyerOrder;
  const [selectedDate, setDate] = useState(new Date(docObject.date));
  const [partnerObject, setPartner] = useState(0);
  const classes = seStyles();      

 
//    docObject.partnerObject = partnerObject;  
    const stPartner = (doc:Partner)=>{
        const s = doc._id.split('|')
        const p = new Partner(s[1])
        p.name = doc.name
        p._id = doc._id
        docObject.partnerObject = p
    
    setPartner(partnerObject+1);        
}
useEffect(() => {
    if (docObject?.partner) getDoc(("cat.partners|"+docObject.partner) as string, stPartner);
//    docObject.partnerObject = parnerObject;  
    return () => {
    }
}, [])

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let id: string = event.target.id;
    docObject[id] = event.target.value;
  };

  const handleChangeDate = (date: MaterialUiPickersDate) => {
    //const d = date as Date
    //if ( date!==null && (date.getTime() === date.getTime()))
        setDate(date as Date);//event.target.value;
    //else setDate(selectedDate)    
  };

  const handleSelectChange = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
}>, child: React.ReactNode) =>{
    docObject.partnerObject = new Partner(event.target.value as string)
    console.log('===')
}

  const handleDateChange = (props: any) => {};

  return (
    <div className={classes.root}>
      <h2>={docObject.partnerObject}=</h2>
      <div>
        <TextField
          style={{ width: "25%", paddingRight: "1rem" }}
          id="number_doc"
          label="Номер"
          defaultValue={docObject.number_doc}
          onChange={handleChange}
        />
        <KeyboardDateTimePicker
            autoOk={false}
            showTodayButton={true}
            invalidDateMessage = "невірна дата" 
          style={{ width: "40%" }}
          variant="inline"
          ampm={false}
          label="Дата"
          value={selectedDate}
          onChange={handleChangeDate}
          onError={console.log}
          //                disablePast
          format="dd/MM/yyyy HH:mm:ss"
        />
      </div>
      <Select
        style={{ width: "65%", paddingRight: "1rem" }}
        id="partner"
        label="Контрагент"
        value={docObject.partnerObject?.ref}
        onChange={handleSelectChange}
      >
          <MenuItem value={docObject.partnerObject?.ref}>{docObject.partnerObject?.name}</MenuItem>
          <MenuItem value="123-235-56-5987">Rrrrr2</MenuItem>
          
      </Select >         
    </div>
  );
};

export default BuyerOrder;
