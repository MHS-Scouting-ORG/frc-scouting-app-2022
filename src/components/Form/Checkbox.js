import React from "react";

import classes from "./Checkbox.module.css";

class Checkbox extends React.Component{
    constructor(props){
        super(props);
        this.changeState = this.changeState.bind(this);
        this.state = {
            checked:false
        }
    }
    
    changeState(){
        this.props.changeState(this.props.place,this.props.label);
    }

    render(){
        return(
            <div className={classes.Div}>
                <label className={classes.Label}>
					    {this.props.label.substring(0,this.props.label.length - 1) + ": "}
                </label>
                < input classname={classes.Input} type="checkbox" checked={this.props.checked} id={this.props.label} onChange={this.changeState} />
            </div>
        )
    }
}

export default Checkbox;
