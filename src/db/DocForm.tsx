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

type docObject = {
  docObject?: cDocument;
  _id?: string;
  ViewForm: FunctionComponent;
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

const DocForm: FunctionComponent<docObject> = (props) => {
  
  const [docObj, setObject] = useState<cDocument|null>(null);
  const [dialogOpen, setDialogOpen] = useState(true);
  const roles = useSelector(selectUserRoles);
  const readonly = !(roles.includes("doc_editor") || roles.includes("admin"));

  let class_name=''
  let ref = ''
  if (props._id){
    const spl = props._id.split('|')
    class_name = spl[0]
    ref = spl[1]
  }


  useEffect(() => {
    if (!docObj) getDoc(props._id as string, (obj:cDocument) =>{
      const o =createObjectByName(class_name) 
      o?.fillProperties(obj)
      if (o)
         setObject(o as cDocument)
    });
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let V: any; //FunctionComponent;
  //V = props.ViewForm;

  const handleClose = () => {
    setDialogOpen(false);
  };

  // useform = true;
  const classes = useStyles();

  if (!docObj) return <div>Об'єкт не знайдено, або недостатньо прав</div>;

   V=docObj.formObject;
  return (
    <div>
      <Dialog className={classes.dialogroot} maxWidth="xl" open={dialogOpen}>
        <AppBar className={classes.root} position="relative">
          <div className={classes.formName}>
           <Toolbar className={classes.toolBarHeader}> {docObj.Caption} </Toolbar>
           <Toolbar className={classes.toolBar}>
              <Button className={classes.menuButton} disabled={readonly} endIcon={<CheckIcon />}>
                Провести
              </Button>
              <Button className={classes.menuButton} disabled={readonly}  endIcon={<SaveIcon />}>
                Збереги
              </Button>
              <Button className={classes.menuButton} onClick={handleClose} endIcon={<CloseIcon />}>
                Закрити
              </Button>
              <IconButton className={classes.menuButton}><RefreshIcon/></IconButton>
              <IconButton className={classes.menuButton}><MenuIcon/></IconButton>
            </Toolbar>
          </div>
        </AppBar>
 
 <V docObject={docObj} disabled={readonly} />
 
      </Dialog>
    </div>
  );
};

export default DocForm;
