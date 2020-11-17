import React, { FunctionComponent } from "react";
import { AppBar, Button, makeStyles, Toolbar } from "@material-ui/core";
import Catalog from "./dbclass";

import { getDoc } from "../components/CouchFunc";
import { useEffect } from "react";
import { useState } from "react";
import { Dialog } from "@material-ui/core";
import { selectUserRoles } from './../store/system/sessionState';
import { useSelector } from "react-redux";

type catObject = {
  catObject?: Catalog;
  _id?: string;
  ViewForm: FunctionComponent;
};

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#004600",
        padding:0,
        margin:0,
     //   color:"rgb(230,230,230)",

        flexGrow: 1,
    },
    menuButton: {
        color:"rgb(230,230,230)",
        textTransform: "none",
       //   marginRight: theme.spacing(1),
      '&:hover':{
        color:"rgb(255,255,255)",
        background: "#008000",
      }
    },
    
    toolBar:{
        minHeight: "2rem",
        padding:0,
    },

    title: {
      flexGrow: 1,
    },
  }));

const CatForm: FunctionComponent<catObject> = (props) => {
  const [catObj, setObject] = useState<Catalog | undefined>();
  const [dOpen, setDopen] = useState(true);
  const roles = useSelector(selectUserRoles);
  const readonly = !(roles.includes("ram_editor") || roles.includes("admin"))

  useEffect(() => {
    getDoc("20874006-c8c1-11e9-8109-00155dcccf0a", setObject);
    return () => {};
  }, []);

  let V: any; //FunctionComponent;
  V = props.ViewForm;

  const handleClose = () =>{
    setDopen(false)
  }

 // useform = true;
  const classes = useStyles();

  if (!catObj) return <div>Об'єкт не знайдено</div>;

  return (
    <div >
      <Dialog open={dOpen}>
        <AppBar className={classes.root} position="relative">
          <Toolbar className={classes.toolBar}>
            <Button className={classes.menuButton} disabled ={readonly}>Збереги й закрити</Button>
            <Button className={classes.menuButton} onClick={handleClose}>Закрити</Button>
          </Toolbar>
        </AppBar>
        {<V catObject={catObj} disabled={readonly}/>}
      </Dialog>
    </div>
  );
};

export default CatForm;
