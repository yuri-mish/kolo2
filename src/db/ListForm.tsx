import React, { FunctionComponent } from "react";
import { AppBar, Button, IconButton, makeStyles, Toolbar } from "@material-ui/core";

import { getDoc } from "../components/CouchFunc";
import { useEffect } from "react";
import { useState } from "react";
import { Dialog } from "@material-ui/core";
import { selectUserRoles } from "./../store/system/sessionState";
import { useSelector } from "react-redux";
import MenuIcon from '@material-ui/icons/Menu';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import RefreshIcon from '@material-ui/icons/Refresh';
import { cDocument } from "./dbclass";
import { createObjectByName } from './dbfunc';

type param = {
  class_name: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline",
    background: "#004600",
    padding: 0,
    margin: 0,
    fontSize: "1.5em",
    flexGrow: 1,
  },

  dialogroot: {
    overflowY:"visible"
  },

  menuButton: {
    color: "rgb(230,230,230)",
    textTransform: "none",

    //   marginRight: theme.spacing(1),
    "&:hover": {
      color: "rgb(255,255,255)",
      background: "#008000",
    },
  },

  toolBar: {
    justifyContent: "flex-end",
    minHeight: "3rem",
    paddingLeft: "1rem",
    width: "50%",
  },

  toolBarHeader: {
    alignSelf: "flex-end",
    minHeight: "3rem",
    paddingLeft: "1rem",
    width: "50%",
  },

  formName: {
    display: "flex",
  },

  title: {
    flexGrow: 1,
  },
}));

const ListForm: FunctionComponent<param> = (props:any) => {
  
  const class_name = props.class_name as string

  //const [docObj, setObject] = useState<cDocument|null>(null);
  //const [dialogOpen, setDialogOpen] = useState(true);
  //const roles = useSelector(selectUserRoles);
  //const readonly = !(roles.includes("doc_editor") || roles.includes("admin"));

  
  //let ref = ''


  // useEffect(() => {
  //   if (!docObj) getDoc(props._id as string, (obj:cDocument) =>{
  //     const o =createObjectByName(class_name) 
  //     o?.fillProperties(obj)
  //     if (o)
  //        setObject(o as cDocument)
  //   });
  //   return () => {};
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  let V: any; //FunctionComponent;
  //V = props.ViewForm;

  // const handleClose = () => {
  //   setDialogOpen(false);
  // };

  // useform = true;
  const classes = useStyles();

  // if (!docObj) return <div>Об'єкт не знайдено, або недостатньо прав</div>;

  const o =  createObjectByName(class_name)
  V= o?.formList;
  return (
    <div>
      
  
 
     <V class_name={class_name}  />
 
    </div>
  );
};

export default ListForm;
