import React from 'react'
import {Button} from '@material-ui/core';
import  AccountBox  from '@material-ui/icons/AccountBox';
import { useSelector} from 'react-redux';
import store from '../../store'
import {RootState} from '../../store/rootReducer'

export const  LoginButton:React.FC = () => {
    let  userName:string = useSelector ((state:RootState) => state.session.userName)//selectSessionUserName)
        return(
            <Button  
                   /*   aria-controls={uMenuOpen ? 'menu-list-grow' : undefined} */
                      aria-haspopup="true"
                      classes={{root:'button',label:'label'}}>
                         <AccountBox/>
                             {userName}
                    </Button>
        )
}                