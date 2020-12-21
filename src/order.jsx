import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// import { makeStyles } from '@material-ui/core';
import { format } from "date-fns";
import { TextBox, DateBox, Menu, Box } from "devextreme-react";
import { locale } from "devextreme/localization";
import moment from "moment";
//import Lookup from "devextreme-react/lookup";
import DataSource from "devextreme/data/data_source";
import SelectBox from "devextreme-react/select-box";
import CustomStore from "devextreme/data/custom_store";
import { RemoteOperations } from "devextreme-react/data-grid";
import { search } from "pouchdb-find";
import { DropDownBox, DropDownOptions } from "devextreme-react/drop-down-box";
import DataGrid, {
  Selection,
  Paging,
  FilterRow,
  Scrolling,
  Column,
  HeaderFilter,
  Editing,
  Lookup,
} from "devextreme-react/data-grid";

import { Item } from "devextreme-react/box";

import { partnerDataSource } from "./db/ds/dsPartners";
import { nomsDataSource } from "./db/ds/dsNoms";
import { Button } from "devextreme-react/button";

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const Order = (props) => {

  var rowData={}

  const lookupDataSource = new CustomStore({
    key: "ref",

    byKey: function (keyf) {
      //if (!keyf) return {ref:keyf,name:''}
      console.log("2:", keyf);
      //var res =  this.load({lookUp:keyf})
      let lookUp = keyf ? ', lookup:"' + keyf + '"' : "";
      const q = `{partners (limit:1 ${lookUp} )
      { 
       ref 
       name
      } 
   }`;
      // console.log(q);
      return fetch("http://localhost:4000/", {
        method: "POST",
        body: JSON.stringify({ query: q }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleErrors)
        .then((response) => response.json())
        .then((response) => response.data.partners[0]);
    },

    // load: () => {    console.log("load():")
    //         return ({})
    //   },

    // load2: (options) => {
    load: (options) => {
      console.log("Options:" + JSON.stringify(options));

      let search =
        options.searchOperation && options.searchValue
          ? ', nameContaine:"' + options.searchValue + '"'
          : "";
      let lookUp = ""; //= (options.lookUp)? ', lookup:"'+options.lookUp+'"':''

      //       console.log(options)
      const q = `{partners (limit:50 ${lookUp} ${search}) { ref name } }`;

      return fetch("http://localhost:4000/", {
        method: "POST",
        body: JSON.stringify({ query: q }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleErrors)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return {
            data: response.data.partners,
          };
        });
    },
    insert: (val) => {
      console.log("4:");
    },
    remove: (key) => {
      console.log("5:");
    },
    update: (dat, values) => {
      console.log("6:");
    },
    // search: (dat) => {
    //   console.log("Search:" + dat);
    // },
  });

  const OrderSchema = {
    date: moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss"),
    number_doc: "",
    partner: { ref: "", name: "" },
    services: [{ nom: { ref: "", name: "" }, price: 0 }],
    doc_amount: 0,
  };

  const [data, setData] = useState(OrderSchema);

  const load = () => {
    return fetch("http://localhost:4000/", {
      method: "POST",
      //credentials: 'same-origin',
      body: JSON.stringify({
        query: `{buyers_orders(ref:"72eae9aa-e11c-11ea-811a-00155da29310",limit:1) {
                    _id
                    doc_amount
                    number_doc
                    date
                    partner{
                        ref
                        name
                    }
                    services {
                      nom {
                        _id
                        ref
                        name
                        name_full
                      }
                      price quantity amount discount_percent
                    }
                  }
                }`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      //              mode:"no-cors" ,
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.data.buyers_orders.length > 0)
          setData(data.data.buyers_orders[0]);
        //totalCount: data.data.buyers_orders.length,
        //summary: response.summary,
        //groupCount: response.groupCount

        // return ()
      });
    //.catch(() => { console.log( 'Network error' )});
  };
  useEffect(() => {
    load();
    return () => {};
  }, []);

  const onValueChanged = (param) => {
    setData((prevState) => ({
      ...prevState,
      date: moment(param.value).format("YYYY-MM-DDTHH:mm:ss"),
    }));
  };

  locale("uk"); //!!!!+++
  console.log("=" + data.date);

  const onQuantityChanged = (r)=>{
    console.log('=99=',r);
    console.log('=00=',rowData);
    rowData.amount = rowData.price*r.target.value;
    setData((prevState) => ({
      ...prevState,
      service: rowData,
    }));
    

  }

  return (
    <div>
     
          <div className="dx-field-label"> Номер </div>
          <div className="dx-field-value">
        
            <TextBox value={data.number_doc} placeholder="номер документа" />
          </div>
     
          <div className="dx-field-label"> Дата </div>
          <div className="dx-field-value">
            <DateBox
              id="date"
              type="datetime"
              //        min={this.minDate}
              //                max={this.now}
              //defaultValue ={Date.now()}

              value={
                data.date
                //                        data.date?Date.parse(data.date):Date.now()
              }
              displayFormat={"dd-MM-yyyy HH:mm:ss"}
              useMaskBehavior={true}
              onValueChanged={onValueChanged}
              //                disabledDates={this.getDisabledDates}
            />
          </div>
   

      <div className="dx-field">
        {/* <Lookup
          value={data.partner.ref}
          dataSource={lookupDataSource}
          valueExpr="ref"
          displayExpr="name"
          //searchExpr="name"
          placeholder="Контрагент"
          //minSearchLength={1}
          searchTimeout={500}
          //onValueChanged={onValueChanged}
          //          applyValueMode="useButtons"
        /> */}
      
            <div className="dx-field-label" > Контрагент </div>
      
            <div className="dx-field-value" ><DropDownBox  
              //              value="ffff"
              value={data.partner.ref}
              valueExpr="ref"
              deferRendering={false}
              displayExpr="name"
              //              displayExpr={this.gridBox_displayExpr}
              placeholder="контрагент ..."
              showClearButton={false}
              dataSource={partnerDataSource}
              // onValueChanged={(e) => {

              //   console.log(e);
              // }}
              //             contentRender={dataGridRender}
            >
              <Menu
                onItemClick={(e) => {
                  console.log(e);
                }}
                dataSource={[
                  {
                    text: "Вибрати",
                  },
                  {
                    text: "Додати",
                  },
                  {
                    text: "Закрити",
                  },
                  {
                    text: "Інше",
                    items: [
                      {
                        text: " інше 1",
                      },
                      {
                        text: "штше 2",
                      },
                    ],
                  },
                ]}></Menu>

              <DataGrid
                remoteOperations={true}
                dataSource={partnerDataSource}
                //      columns={["ref", "name", "edrpou"]}
                hoverStateEnabled={true}
                //selectedRowKeys={this.state.gridBoxValue}
                onSelectionChanged={(e) => {
                  setData((prevState) => ({
                    ...prevState,
                    partner: {
                      ref: e.selectedRowsData[0].ref,
                      name: e.selectedRowsData[0].name,
                    },
                  }));
                  //console.log(e);
                }}
                height="90%">
                <Selection mode="single" />
                <Scrolling mode="infinite" />
                <Paging enabled={true} pageSize={50} />
                <FilterRow visible={true} />
                <Column dataField="ref" visible={false} />
                <Column dataField="name" caption="Назва" />
                <Column dataField="edrpou" caption="код ЄДРПОУ" />
              </DataGrid>
            </DropDownBox></div>
     
      </div>

      {/* <TextBox
        value={format(
          data.date ? Date.parse(data.date) : Date.now(),
          "dd-MM-yyyyHH:mm:ss"
        )}
        placeholder="дата документа"
        mask="00-00-0000 00:00:00"
      /> */}
      <DataGrid
        remoteOperations={false}
        showBorders={true}
        dataSource={data.services.slice()}
        //      columns={["ref", "name", "edrpou"]}
        hoverStateEnabled={true}
        //selectedRowKeys={this.state.gridBoxValue}
        on={(e) => {
          console.log('=999=',e)}}
        onSelectionChanged={(e) => {
          console.log('=9=',e);
                setData((prevState) => ({
            ...prevState,
            partner: {
              ref: e.selectedRowsData[0].ref,
              name: e.selectedRowsData[0].name,
            },
          }))
        }}
          selectTextOnEditStart={true}
          //startEditAction={(e)=>{console.log('startEditAction'+e)}}
//         onSaving={onQuantityChanged}
          onEditorPrepared={(e)=>{
            if (e.dataField === 'quantity') {
                rowData = e.row.data;
                e.editorElement.onkeydown = onQuantityChanged
                console.log(e)
          }} }
        >
        <Editing
          mode="cell"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        />

        <Column
          dataField="nom.ref"
          calculateDisplayValue={(data) => {
            //                console.log(data) ;
            return data.nom?.name;
          }}>
          <Lookup
            dataSource={nomsDataSource}
            valueExpr="ref"
            displayExpr="name"
            minSearchLength={3}
            searchTimeout={500}></Lookup>
        </Column>
        <Column dataField="price" caption="Ціна" />
        <Column dataField="quantity" caption="Кількість" />
        <Column dataField="discount_percent" caption="%скидки" />
        <Column dataField="amount" caption="Сума" />
      </DataGrid>
    </div>
  );
};
