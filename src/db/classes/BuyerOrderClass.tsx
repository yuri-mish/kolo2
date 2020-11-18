
import React, { FunctionComponent, useState } from 'react'
import {Document} from '../dbclass';
import { TextField, makeStyles } from '@material-ui/core';
import {KeyboardDateTimePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";




   
// interface IGoodsCard extends CatCard  {
//     priceValue?:number;
// }


     class BuyerOrder extends Document{
    /**
     * The price. 
     */
    partner:string = ''
    constructor(uuid:string=''){
        super( 'doc.buyer_order', uuid)
    };

    
}

const seStyles = makeStyles((theme) => ({
    root: {
        paddingLeft:'10px',
        paddingRight:'10px',

    },
}))

export const ViewOrder:FunctionComponent =(props:any)=>{
    let docObject = props.docObject
    const [selectedDate, setDate] = useState(new Date(docObject.date))

    const classes = seStyles()
    
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
       let id:string  = event.target.id as keyof BuyerOrder
        docObject[id] = event.target.value ;
      };

    const handleDateChange = (props:any)=>{

    }  
    
      return(
    
        <div className={classes.root}>
           <h2>={docObject._id}=</h2> 
           <div>
           <TextField style={{width:'25%',paddingRight:'1rem'}} id="number_doc" label="Номер" defaultValue={docObject.number_doc} onChange={handleChange}/>
               <KeyboardDateTimePicker  style={{width:'40%'}} 
                    variant="inline"
                    ampm={false}
                    label="Дата"
                    value={selectedDate}
                    onChange={handleDateChange}
                        onError={console.log}
    //                disablePast
                    format="dd/MM/yyyy HH:mm:ss"
                />
      
           </div>
           <TextField style={{width:'25%',paddingRight:'1rem'}} id="partner" label="Контрагент" defaultValue={docObject.partner} onChange={handleChange}/>
        </div>  
    
    )
}


export default BuyerOrder

    

 
