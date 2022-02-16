import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Textbox from "./Textbox";
import Dropdown from "./Dropdown";
import Initials from "./Initials";

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checkBoxValues:[false,false,false,false,false,false],
            Comment:"",
            scoutInitials:"",
            matchNumber: "",
            teamNumber: ""
        };

        this.checkBoxClicked = this.checkBoxClicked.bind(this);
        this.makeCheckBox = this.makeCheckBox.bind(this);
        this.checkState = this.checkState.bind(this);
        this.changeInital = this.changeInital.bind(this);
        this.changeTeam = this.changeTeam.bind(this);
        this.changeMatch = this.changeMatch.bind(this);
    }

    changeInital(event){
        this.setState({scoutInitials: event.target.value.toUpperCase()});
    }

    changeTeam(event){
        this.setState({teamNumber: event.target.value});
    }

    changeMatch(event){
        this.setState({matchNumber: event.target.value});
    }


    checkBoxClicked(i){
        let boxChecked = this.state.checkBoxValues;
        boxChecked[i] = !boxChecked[i];
    }

    makeCheckBox(title,i){
        return(
            <div>
                <Checkbox
                    label = {title}
                    changeState={this.checkBoxClicked}
                    place={i}
                />
            </div>
        )
    }

    checkState(){
        let checkBox = this.state.checkBoxValues;
        console.log(checkBox[3]);
    }

    render(){
        return(
            <div>
                <h1> FORM </h1>
                <div>
                <Initials changeInitials={this.changeInital} title={"Scouter Initials: "}></Initials>
                </div>
                <div>
                <Input changeNumber={this.changeTeam} title={"Team Number: "}></Input>
                </div>
                <div>
                    <Input changeNumber={this.changeMatch} title={"Match Number: "}></Input>
                </div>
                <div>
                    <Dropdown choice={["Select", "Blue Alliance", "Red Alliance"]}></Dropdown>
                </div>
                <h3> AUTONOMOUS </h3>
                <div>
                    
                </div>
                <h3> TELEOP </h3>
                <div>
                    {/*# of fouls*/}
                    {/*# of tech fouls*/}
                    {this.makeCheckBox("Yellow card: ",0)}
                    {this.makeCheckBox("Red card: ",1)}
                    {this.makeCheckBox("Disabled: ",2)}
                    {this.makeCheckBox("Disqualifed: ",3)}
                    {this.makeCheckBox("Hangar Bonus: ",4)}
                    {this.makeCheckBox("Cargo Bonus: ",5)}
                    <button onClick={this.checkState}>CHECK STATE</button>
                </div>
                <div>
                    <Dropdown choice={["Select", "Attempted", "Low", "Mid", "High", "Traversal"]}></Dropdown>
                </div>
            </div>
        )
    }
}

export default Form;
