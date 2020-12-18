import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// import { makeStyles } from '@material-ui/core';
import { format } from "date-fns";
import { TextBox, DateBox } from "devextreme-react";
import { locale } from "devextreme/localization";
import moment from "moment";
import Lookup from "devextreme-react/lookup";
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
} from "devextreme-react/data-grid";

import { partnerDataSource } from "./db/ds/dsPartners";

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const Order = (props) => {
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
                      price
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


  return (
    <div>
      <div style={{ display: "flex" }}>
        <TextBox value={data.number_doc} placeholder="номер документа" />

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
        <Lookup
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
        />

        <DropDownBox
          //              value="ffff"
          value={data.partner.ref}
          valueExpr="ref"
          deferRendering={false}
          displayExpr="name"
          //              displayExpr={this.gridBox_displayExpr}
          placeholder="Select a value..."
          showClearButton={true}
          dataSource={partnerDataSource}
          onValueChanged={(e) => {
            console.log(e);
          }}
          //             contentRender={dataGridRender}
        >
          <DataGrid
            remoteOperations={true}
            dataSource={partnerDataSource}
            columns={["ref", "name", "edrpou"]}
            hoverStateEnabled={true}
            //selectedRowKeys={this.state.gridBoxValue}
            onSelectionChanged={(e) => {
              console.log(e);
            }}
            height="100%">
            <Selection mode="single" />
            <Scrolling mode="infinite" />
            <Paging enabled={true} pageSize={10} />
            <FilterRow visible={true} />
          </DataGrid>
        </DropDownBox>
      </div>

      <TextBox
        value={format(
          data.date ? Date.parse(data.date) : Date.now(),
          "dd-MM-yyyyHH:mm:ss"
        )}
        placeholder="дата документа"
        mask="00-00-0000 00:00:00"
      />
    </div>
  );
};
