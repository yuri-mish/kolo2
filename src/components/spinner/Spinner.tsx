import React,{FunctionComponent} from 'react';
import './Spinner.css';
import tyrespin from '../../img/tyrespin.svg';

type SpinnerProps = {
    show?:boolean,
}

const Spinner:FunctionComponent<SpinnerProps>=(props)=>{
//    console.log (props)
    if (props.show === undefined || props.show)
        return(
            <div className="spin">
                <img src={tyrespin} className="spin" alt="spiiner" />
        </div>
        )
    else
            return (<div></div>)
}

export default Spinner;