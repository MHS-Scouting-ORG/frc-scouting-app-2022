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
        this.setState({hangarUsed:event.value});
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
                            <option value='None'> None </option>
                            <option value='Attempted'> Attempted </option>
                            <option value='Low'> Low </option>
                            <option value='Mid'> Mid </option>
                            <option value='High'> High </option>
                            <option value='Traverse'> Traversal </option>
                        </select>
                    </label>
                </div>
                <div>
                    {//this.makeHangarStartEndTimeBoxes()
                    }
                </div>
            </div>
        )
    }
}

export default HangarDropdown