import React from 'react';
import classes from './MatchDropdown.module.css';

class Dropdown extends React.Component{
    constructor(props){
        super(props);
        this.dropDownChange = this.dropDownChange.bind(this);
    }

    dropDownChange(event){
        this.props.setState(event,this.props.place);
    }

    render(){
        return (
            <div className={classes.Div}>
                <label className={classes.Label}>{this.props.title}</label>
                <select className={classes.Select} onChange={this.dropDownChange}>
                    <option key={"empty"}></option>
                    {this.props.choices.map((choice) => <option key={choice} > {choice} </option>)}
                </select>
            </div>
        )
    }
}

export default Dropdown;
