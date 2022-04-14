import React from 'react';
import classes from "./HangarDropdown.module.css";

class HangarDropdown extends React.Component{
    constructor(props){
        super(props);
        this.changeHangar = this.changeHangar.bind(this);
        this.makeHangarStartEndTimeBoxes = this.makeHangarStartEndTimeBoxes.bind(this);
        this.state = {
            hangarUsed:"",
        }
    }

    changeHangar(event){
        this.props.changeHangarUsed(event);
        this.setState({hangarUsed:event.target.value})
    }

    makeHangarStartEndTimeBoxes(){
        return (
            this.props.makeHangarStartEndBoxes(this.state.hangarUsed)
        )
    }

    render(){
        return (
            <div className={classes.Div}>
                <div>
                    <label className={classes.Label}> {"Hangar Used: "}
                        <select className={classes.Select} onChange={this.changeHangar}>
                            <option></option>
                            <option> None </option>
                            <option> Attempted </option>
                            <option> Low </option>
                            <option> Mid </option>
                            <option> High </option>
                            <option> Traversal </option>
                        </select>
                    </label>
                </div>
                <div>
                    {this.makeHangarStartEndTimeBoxes()}
                </div>
            </div>
        )
    }
}

export default HangarDropdown