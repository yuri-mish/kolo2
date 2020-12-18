import  CustomStore  from 'devextreme/data/custom_store';

export const partnerDataSource = new CustomStore({

    key: "ref", 
    byKey: (ref) => {
      if (!ref) return {ref:ref,name:''}
      console.log("=2:", ref);
      //var res =  this.load({lookUp:keyf})
      const q = `{partners (ref:"${ref}" ) { ref name edrpou } }`;
      
      return fetch("http://localhost:4000/", {
        method: "POST",
        body: JSON.stringify({ query: q }),
        headers: {
          "Content-Type": "application/json",
        },
      })
//        .then(handleErrors)
        .then((response) => response.json())
        .then((response) => { 
            const res = (response.data.partners.length===0)?{ref:ref,name:''}:response.data.partners[0]
            console.log("=res:", res);   
            return res
          })
    },


     load: (options) => {
      console.log("=Options:" + JSON.stringify(options));

      let _search =
        options.searchOperation && options.searchValue
          ? ', nameContaine:"' + options.searchValue + '"'
          : "";

      let lookUp = ""; //= (options.lookUp)? ', lookup:"'+options.lookUp+'"':''

      let _filter=''
      if (options.filter) {
          let ofilt = options.filter
          ofilt.forEach(element => {
              if (Array.isArray(element)){
                _filter += ` ${element[0]}:"${element[2]}" `
              }
            
          });

      }

      //       console.log(options)
      const q = `{partners (limit:50 ${lookUp} ${_search} ${_filter}) { ref name edrpou}}`//name edrpou } }`;

      return fetch("http://localhost:4000/", {
        method: "POST",
        body: JSON.stringify({ query: q }),
        headers: {
          "Content-Type": "application/json",
        },
      })
     //   .then(handleErrors)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response.data.partners)
          return {
            data: response.data.partners
          };
        });
    },
    insert: (val) => {
      console.log("4:");
      return new Promise((resolve, reject) => {
        resolve([{ text: "Test insert" }]);
      })
    },
    remove: (key) => {
      console.log("5:");
      return new Promise((resolve, reject) => {
        resolve();
      })
    },
    update: (dat, values) => {
      console.log("6:");
      return new Promise((resolve, reject) => {
        resolve([{ text: "Test insert" }]);
      })
    },
     
  });



