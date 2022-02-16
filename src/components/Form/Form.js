import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Textbox from "./Textbox";
import Initials from "./Initials";
import Dropdown from "./Dropdown";

class Form extends React.Component{
    constructor(props){
        super(props);
        this.initialsChange = this.initialsChange.bind(this);
        this.changeTeamNumber = this.changeTeamNumber.bind(this);
        this.changeMatchNumber = this.changeMatchNumber.bind(this);
        this.checkBoxClicked = this.checkBoxClicked.bind(this);
        this.makeCheckBox = this.makeCheckBox.bind(this);
        this.checkState = this.checkState.bind(this);
        this.getVal = this.getVal.bind(this);
        this.state = {
            scouterInitials:"",
            teamNumber:"",
            matchNumber:"",
            checkBoxValues:[false,false,false,false,false,false],
            Comment:"",
            testing: ''
        };
    }

    initialsChange(event){
        this.setState({scouterInitials:event.target.value.toUpperCase()});
    }

    changeTeamNumber(event){
        this.setState({teamNumber:event.target.value});
    }

    changeMatchNumber(event){
        this.setState({matchNumber:event.target.value});
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

    getVal(val){
        this.setState({testing: val});
        console.log(val);
    }

    render(){
        return(
            <div>
                <h1>FORM</h1>
                <div>
                    <Initials changeInitials={this.initialsChange}/>
                </div>
                <div>
                    <Input change={this.changeTeamNumber} title={"Team Number: "}></Input>
                </div>
                <div>
                    <Input change={this.changeMatchNumber} title={"Match Number: "}></Input>
                </div>
                <div>
                    
                </div>
                <div>
                    <Dropdown choices={["None", "Attempted", "Low", "Mid", "High", "Traversal"]}/>
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
