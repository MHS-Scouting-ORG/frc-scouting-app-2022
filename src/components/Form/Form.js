import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Textbox from "./Textbox";
import Initials from "./Initials"
import Dropdown from "./Dropdown"

class Form extends React.Component{
    constructor(props){
        super(props);
        this.initialsChange = this.initialsChange.bind(this);
        this.checkBoxClicked = this.checkBoxClicked.bind(this);
        this.makeCheckBox = this.makeCheckBox.bind(this);
        this.checkState = this.checkState.bind(this);
        this.state = {
            scouterInitials:"",
            teamNumber:"",
            checkBoxValues:[false,false,false,false,false,false],
            Comment:"",
        };
    }

    initialsChange(event){
        this.setState({scouterInitials:event.target.value.toUpperCase()});
    }

    changeTextState(){
        
    }

    checkBoxClicked(i){
        let boxChecked = this.state.checkBoxValues;
        boxChecked[i] = !boxChecked[i];
    }

    makeCheckBox(title,i){
        return(
            <div>
                <Checkbox
                    label={title}
                    changeState={this.checkBoxClicked}
                    place={i}
                />
            </div>
        )
    }

    checkState(){
        let checkBox = this.state.checkBoxValues;
        console.log(this.state);
        console.log(checkBox[3]);
    }

    render(){
        return(
            <div>
                <h1>FORM</h1>
                <div>
                    <Initials changeInitials={this.initialsChange}/>
                </div>
                <div>
                    {/* */}
                    {this.makeCheckBox("yellow card: ",0)}
                    {this.makeCheckBox("red card: ", 1)}
                    {this.makeCheckBox("disabled: ", 2)}
                    {this.makeCheckBox("disqualifed: ", 3)}
                    {this.makeCheckBox("hangar", 4)}
                </div>
                <button onClick={this.checkState}>CHECK STATE</button>
            </div>
        )
    }
}

export default Form;
