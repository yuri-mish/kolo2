import React from 'react';
 
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
 
import Button from 'devextreme-react/button';
import CustomStore from "devextreme/data/custom_store";
import DataGrid, { Column, Editing, Paging, Lookup } from 'devextreme-react/data-grid';
import { RepeatOne } from '@material-ui/icons';

 
// class App2 extends React.Component {
//     render() {
//         return (
//             <div>
//             <Button
//                 text="Click me"
//                 onClick={this.sayHelloWorld}
//             />
//             </div>
//         );
//     }
 
//     sayHelloWorld() {
//         alert('Hello world!')
//     }
// }
const handleErrors = (response) =>{
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
const customDataSource = new CustomStore({
    key: "_id",
    editing: {  
            mode: "cell",  
            allowAdding: true,  
            allowUpdating: true,  
            allowDeleting: true  
        }, 
    update: (dat)=>{console.log(dat)} ,    
    load: () => {
      
        return fetch('http://localhost:4000/',{
            method: "POST",
            body:JSON.stringify({query:
                `{buyers_orders(limit:1000)
                    { 
                     _id 
                     number_doc
                     date
                     doc_amount
                     partner { 
                         _id ref name 
                        } 

                    }
                 }` 
                }),
            headers: {
                'Content-Type': 'application/json'
                },
//              mode:"no-cors" ,
             
            }).then(handleErrors)
              .then((response) => {
                return response.json()
            }).then((data)=>{
 //               console.log(data.data)
                return {
                    data: data.data.buyers_orders,
                    totalCount: data.data.buyers_orders.length,
                    //summary: response.summary,
                    //groupCount: response.groupCount
                }
               // return ()  
            })
            //.catch(() => { console.log( 'Network error' )});
    },
    // insert: (data) => {
    //   createObject({
    //     variables: { product: { ...data, oid: uuidv4() } },
    //   }).then((xx) => refetch());
    // },
    // update: (key, values) => {
    //   updateObject({
    //     variables: {
    //       product: { ...values },
    //       oid: key,
    //     },
    //   });
    // },
    // remove: (key) => {
    //   deleteObject({
    //     variables: {
    //       oid: key,
    //     },
    //   }).then((xx) => refetch());
    // },
  });

  const lookupDataSource = new CustomStore({
    key: "ref",
    byKey: function (key) { 
        console.log(key)
//        return $.get('http://sampleservices.devexpress.com/api/Categories/' + key.toString());  
        return this.load({ref:key}) //$.get('http://sampleservices.devexpress.com/api/Categories/' + key.toString());  
            }  ,
    load: (options) => {
        
        return fetch('http://localhost:4000/',{
            method: "POST",
            body:JSON.stringify({query:
                `{partners (limit:50, ref:${options.ref})
                    { 
                     ref 
                     name
                    } 
                 }` 
                }),
            headers: {
                'Content-Type': 'application/json'
                },
            }).then(handleErrors)
              .then((response) => {
                return response.json()
            }).then((data)=>{
                return {
                    data: data.data.partners,
                    totalCount: data.data.partners.length,
                }
            })
    },
  });

const App2 =()=> {

    const sayHelloWorld = ()=> {
        alert('Hello world!')
    }

    return (
            <div>
            <Button
                text="Click me"
                onClick={sayHelloWorld}
            />
            <DataGrid
          id="gridContainer"
          dataSource={customDataSource}
          keyExpr="ID"
          allowColumnReordering={true}
          showBorders={true}
          allowSorting = {true}
      
        //   onEditingStart={this.onEditingStart}
        //   onInitNewRow={this.onInitNewRow}
        //   onRowInserting={this.onRowInserting}
        //   onRowInserted={this.onRowInserted}
        //   onRowUpdating={this.onRowUpdating}
        //   onRowUpdated={this.onRowUpdated}
        //   onRowRemoving={this.onRowRemoving}
        //   onRowRemoved={this.onRowRemoved}
        //   onSaving={this.onSaving}
        //   onSaved={this.onSaved}
        //   onEditCanceling={this.onEditCanceling}
        //   onEditCanceled={this.onEditCanceled}
         >
         <Editing
            mode="batch"
            allowUpdating={true}
            selectTextOnEditStart={true}
  //          startEditAction={this.state.startEditAction} 

            />

        <Column
          dataField="number_doc"
          caption="Номер"
          dataType="string"
          //format="currency"
          alignment="left"
//          allowEditing={true}
        />
        <Column
          dataField="date"
          caption="Дата"
          dataType="date"
          //format="currency"
          alignment="left"
        />
        <Column
          dataField="partner.ref"
          caption="Контрагент"
          dataType="string"
          //format="currency"
          alignment="left"
          calculateDisplayValue={(data)=> {console.log(data) ; return data.partner?.name}}
        >
         <Lookup dataSource={lookupDataSource} valueExpr="ref" displayExpr="name" />
        </Column> 

          <Column
          dataField="doc_amount"
          caption="Сума"
          dataType="number"
          //format="currency"
          alignment="right"
     
//          calculateCellValue={(data)=> {console.log(data) ; return data.partner?.name}}
        />

          </DataGrid>

            </div>
    )
 
}
 
export default App2;