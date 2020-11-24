import React, { FunctionComponent, useEffect, useState } from "react";
import { cDocument, mdb } from "../dbclass";
import { makeStyles, Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Partner } from "./PartnersClass";
import { getDoc } from "../../components/CouchFunc";
import Autocomplete from "../../components/autocomplete/Autocomplete";

// interface IGoodsCard extends CatCard  {
//     priceValue?:number;
// }

class BuyerOrder extends cDocument {
  [key: string]: any;
  /**
   * Контрагент.
   */
  partnerObj: Partner | null = null;

  constructor(uuid: string = "") {
    super("doc.buyer_order", "Замовлення", uuid);
    this.partner = null;

    this.fields.partner = {
      caption: "Контрагент",
      class_name: "cat.partners",
      isRef: true,
      value: undefined,
      obj: {},
    };
    Object.defineProperties(this, {
      partner: {
        set: (value) => {this.fields.partner.isRef?(this.fields.partner.obj = value):(this.fields.partner.value = value)},
        get: () => {return this.fields.partner.isRef?this.fields.partner.obj:this.fields.partner.value},
      },
    });
  }
}

const seStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
}));

export const ViewOrder: FunctionComponent = (props: any) => {
  let docObject: BuyerOrder = props.docObject;
  const [selectedDate, setDate] = useState(
    new Date(docObject.date as Date)
  );
  const [partnerRef, setPartner] = useState("");
  const classes = seStyles();

  //    docObject.partnerObject = partnerObject;
  const stPartner = (doc: any) => {
    if (doc){
    const s = doc._id.split("|");
    const p = new Partner(s[1]);
    p.fillProperties(doc);
    docObject.partner = p;
    setPartner(s[1]);
  }
  else{
    docObject.partner = new Partner(mdb.emptyRef);
    docObject.partner.fields.name.value='<не знайдено>'
    setPartner(mdb.emptyRef);
  }
  };
  useEffect(() => {
    getDoc("cat.partners|" + docObject.fields.partner.value, stPartner);
    //    docObject.partnerObject = parnerObject;
    return () => {};
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let id: string = event.target.id;
    docObject[id] = event.target.value;
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    // let id: string = event.target.id;
    // docObject[id] = event.target.value;
  };

  const handleChangeDate = (date: MaterialUiPickersDate) => {
    //const d = date as Date
    //if ( date!==null && (date.getTime() === date.getTime()))
    setDate(date as Date); //event.target.value;
    //else setDate(selectedDate)
  };

  const handleSelectChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => {
    getDoc("cat.partners|" + event.target.value, stPartner)
  };

  const handleDateChange = (props: any) => {};

  return (
    <div className={classes.root}>
      <h2>={docObject.partner.fields?.name.value}=</h2>
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
          invalidDateMessage="невірна дата"
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
        value={partnerRef}
        //defaultValue={partnerRef}
        onChange={handleSelectChange}>
         <option value="0000" disabled>Оберіть ...</option>
         <option value={docObject.partner.ref}>
          {docObject.partner.Caption}
        </option>
        <option value="123-235-56-5987">Rrrrr2</option>
      </Select>
      <TextField
        style={{ width: "65%", paddingRight: "1rem" }}
        id="partner"
        label="Контрагент"
        value={partnerRef}
        defaultValue={partnerRef}
        select
        onClick={handleClick}
        onChange={handleChange}>
        <option value={docObject.partnerObject?.ref}>
          {docObject.partnerObject?.name}
        </option>
        <option value="123-235-56-5987">Rrrrr2</option>

        <div id="sdf">
          anytext <TextField id="standard-basic" label="Standard" value="asd" />{" "}
          <button>sdfsdf</button>{" "}
        </div>
      </TextField>
      <Autocomplete defaultValue={docObject.partnerObject?.ref} />
    </div>
  );
};

export default BuyerOrder;
