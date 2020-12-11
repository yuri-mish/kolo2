import React, { FunctionComponent, useEffect, useState } from "react";
import { cDocument, mdb } from "../dbclass";
import { makeStyles, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Partner } from "./PartnersClass";
import { getDoc, getPouchDocs } from "../../components/CouchFunc";
import Autocomplete from "../../components/autocomplete/Autocomplete";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Rowing } from "@material-ui/icons";
import { getCouchCatArray } from './../../components/CouchFunc';

// interface IGoodsCard extends CatCard  {
//     priceValue?:number;
// }



const seStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
}));

const meta = mdb.schema["doc.buyers_order"]
export const ViewOrders: FunctionComponent = (props: any) => {
  const [rows, setRows] = useState([]);
  const [rowsL, setRowsL] = useState([]);

  const repl2 = (docs:any) =>{
    setRowsL(docs.rows)
  }

  useEffect(() => {
   
   let newRows = [...rows]
   newRows.map((rowdoc:any)=>{
      meta.fields.forEach((field:any)=>{
         if(field.isRef){
          let el:any = rowsL.find((elem:any)=>{
              return elem.id === (field.class_name+'|'+rowdoc[field.name]) 
          }) as {}|undefined
          if (el){
            if (el.doc){
              rowdoc[field.name+'_o_'] = el.doc
//              console.log ('=90=:'+el.doc.name+'===')
            }
            else{
              rowdoc[field.name+'_o_'] = {name:'<вилучено:'+field.class_name+'|'+rowdoc[field.name]+'>'}
//              console.log('=90=:!!!=!!!!'+JSON.stringify(el))  
            }
        }
      } 
    })
    })
    
    setRows(newRows)

  }, [rowsL])

  const repl = (docs:any)=>{
     const set = new Set() 
     docs.forEach((row:any)=>{
      meta.fields.forEach((field:any)=>{
        if (field.isRef){
            set.add(field.class_name+'|'+row[field.name])
          }
        })
     })
     
  
     setRows(docs)
     getCouchCatArray(Array.from(set) as string[],repl2)
  }

  useEffect(() => {
    getPouchDocs(
      "doc.buyers_order",
      repl,
      ['_id','number_doc','date','partner','department','doc_amount']
    )
    return () => {};
  }, []);

  function Row(props: { row: any }) {
    const { row } = props;

    return(
      <React.Fragment>
      <TableRow >
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => {}}>
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.number_doc}
        </TableCell>
        <TableCell align="right"><input defaultValue={row.date}/></TableCell>
        <TableCell align="right">{row.partner_o_?.name}</TableCell>
        <TableCell align="right">{row.department_o_?.name}</TableCell>
        <TableCell align="right">{row.doc_amount}</TableCell>
      </TableRow>
    </React.Fragment>
    )
  }
  return (
    <div>
  <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert </TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any) => (
            <Row  row={row}  />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export const ViewOrder: FunctionComponent = (props: any) => {
  let docObject: BuyerOrder = props.docObject;
  const [selectedDate, setDate] = useState(new Date(docObject.date as Date));
  const [partnerRef, setPartner] = useState(docObject.fields.partner.value);
  const [renew, setRenew] = useState({});
  const classes = seStyles();

  const stPartner = (doc: any) => {
    const ref = doc?doc._id.split("|")[1]:mdb.emptyRef
    docObject.partner = new Partner(ref);
    if (doc){ docObject.partner.fillProperties(doc)}
    else{ docObject.partner.name='<не знайдено>'}
    setPartner(ref);
  };

  const st=(doc:any,field:string)=>{
  
    if (doc){
     doc.ref = doc?._id.split('|')[1]
     docObject.fields[field].obj = doc
    setRenew({fields:doc._id})
    }

 
//    const class_name = doc.class_name.split("|")[1]
  }
  

  useEffect(() => {
    meta.fields.forEach((field:any)=>{
      console.log('-00-:'+field.name)
  
    if (field.isRef)
      getDoc(field.class_name+"|" + docObject.fields[field.name].value, st,field.name)
  })//    getDoc("cat.partners|" + docObject.fields.partner.value, stPartner);
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
      <h2>={docObject.partner?.name}=</h2>
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
          style={{ width: "25%" }}
          variant="inline"
          ampm={false}
          label="Дата"
          value={selectedDate}
          onChange={handleChangeDate}
          onError={console.log}
          //                disablePast
          format="dd/MM/yyyy HH:mm:ss"
        />
      <TextField
        style={{ width: "45%", paddingLeft: "1rem" }}
        id="partner"
        label="Контрагент"
        value={partnerRef}
        defaultValue={partnerRef}
        select
        onClick={handleClick}
        onChange={handleChange}>
        <option value={docObject.partner?.ref}>
          {docObject.partner?.name}
        </option>
        <option value="123-235-56-5987">Rrrrr2</option>

        <div id="sdf">
          anytext <TextField id="standard-basic" label="Standard" value="asd" />{" "}
          <button>sdfsdf</button>{" "}
        </div>
      </TextField>
        </div>
        
     <TextField
          style={{ width: "45%", paddingRight: "1rem" }}
          id="department"
          //label="Підрозділ"
          value={docObject.department?.name}
          defaultValue={docObject.department?.name}
         onChange={handleChange}
         placeholder="..."
          disabled={false}
        />
      <Select
        style={{ width: "45%", paddingRight: "1rem" }}
        id="partner"
        label="Контрагент"
        value={partnerRef}
        defaultValue={partnerRef}
        onChange={handleSelectChange}>
         <option value={mdb.emptyRef} disabled>Оберіть ...</option>
         <option value={docObject.partner?.ref}>
          {docObject.partner?.name}
        </option>
        <option value="123-235-56-5987">Rrrrr2</option>
      </Select>
     
      <Autocomplete defaultValue={docObject.partner?.ref} />
      
    </div>
  );
};


class BuyerOrder extends cDocument {
  [key: string]: any;
  /**
   * Контрагент.
   */
  //partnerObj: Partner | null = null;
  formObject = ViewOrder
  formList = ViewOrders

  constructor(uuid: string = "") {
    super("doc.buyers_order", "Замовлення", uuid);
  }
}
export default BuyerOrder;