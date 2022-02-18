import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Textbox from "./Textbox";
import Initials from "./Initials";
import Dropdown from "./Dropdown";
import Scale from "./Scale"

class Form extends React.Component{
    constructor(props){
        super(props);
        this.initialsChange = this.initialsChange.bind(this);
        this.changeTeamNumber = this.changeTeamNumber.bind(this);
        this.changeMatchNumber = this.changeMatchNumber.bind(this);
        this.inputBoxChanged = this.inputBoxChanged.bind(this);
        this.makeInputBox = this.makeInputBox.bind(this);
        this.checkBoxClicked = this.checkBoxClicked.bind(this);
        this.makeCheckBox = this.makeCheckBox.bind(this);
        this.setComment = this.setComment.bind(this);
        this.scaleChange = this.scaleChange.bind(this);
        this.submitStates = this.submitStates.bind(this);
        this.state = {
            scouterInitials:"",
            teamNumber:"",
            matchNumber:"",
            allianceColor:"",
            taxi:"",
            hangarUse:"",
            inputBoxValues:[0,0,0,0,0,0,0,0,0,0],
            rankingPoints:"",
            checkBoxValues:[false,false,false,false,false,false,false,false,false,false,false],
            comment:"",
            scale:0,
        };
    }

    initialsChange(event){
        this.setState({scouterInitials:event.target.value.toUpperCase()});
    }

    changeTeamNumber(event,fill){
        this.setState({teamNumber:event.target.value});
    }

    changeMatchNumber(event,fill){
        this.setState({matchNumber:event.target.value});
    }

    inputBoxChanged(event,i){
        let inputStates = this.state.inputBoxValues;
        inputStates[i] = event.target.value;
    }

    makeInputBox(title,i){
        return (
            <div>
                <Input
                    label={title}
                    setState={this.inputBoxChanged}
                    place={i}
                />
            </div>
        )
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

    setComment(event){
        this.setState({comment:event.target.value});
    }

    scaleChange(event){
        this.setState({scale:event.target.value})
    }

    submitStates(){
        let checkBox = this.state.checkBoxValues;

        console.log(this.state);
        console.log(checkBox[3]);
        
    }

    render(){
        return(
            <div>
                <h1>FORM</h1>
                <Initials changeInitials={this.initialsChange}/>
                <Input setState={this.changeTeamNumber} place={-1} label={"Team Number: "}></Input>
                <Input setState={this.changeMatchNumber} place={-1} label={"Match Number: "}></Input>
                <Dropdown title={"Alliance Color: "} choices={["Blue", "Red"]}></Dropdown>
                <h3>AUTONOMOUS</h3>
                {this.makeInputBox("# Low Hub Made: ",0)}
                {this.makeInputBox("# Low Hub Missed: ",1)}
                {this.makeInputBox("# Upper Hub Made: ",2)}
                {this.makeInputBox("# Upper Hub Missed: ",3)}
                <Dropdown title={"Taxi: "} choices={["No","Yes"]}></Dropdown>
                {/* */}
                <h3>TELE-OP</h3>
                {this.makeInputBox("# Low Hub Made: ",4)}
                {this.makeInputBox("# Low Hub Missed: ",5)}
                {this.makeInputBox("# Upper Hub Made: ",6)}
                {this.makeInputBox("# Upper Hub Missed: ",7)}
                <Dropdown title={"Hangar: "} choices={["None", "Attempted", "Low", "Mid", "High", "Traversal"]}/>
                {this.makeInputBox("# of fouls: ",8)}
                {this.makeInputBox("# of tech fouls",9)}
                {this.makeCheckBox("Yellow card: ",0)}
                {this.makeCheckBox("Red card: ", 1)}
                {this.makeCheckBox("Disabled: ", 2)}
                {this.makeCheckBox("Disqualifed: ", 3)}
                {this.makeCheckBox("Hangar Bonus: ", 4)}
                {this.makeCheckBox("Cargo Bonus: ", 5)}
                <Dropdown title={"Ranking Points: "} choices={[0,1,2,3,4]}></Dropdown>
                <h3>PRIORITIES & STRATEGIES</h3>
                {this.makeCheckBox("Low Hub Shooter: ", 6)}
                {this.makeCheckBox("Upper Hub Shooter: ", 7)}
                {this.makeCheckBox("Launchpad Shooter: ", 8)}
                {this.makeCheckBox("Hanger: ", 9)}
                {this.makeCheckBox("Defense: ", 10)}
                <Textbox title={"Comments: "} commentState={this.setComment}></Textbox>
                <p> Scale of 1-10, rate partnership (how well you do think our alliances' can work together) </p>
                <Scale values={[1,2,3,4,5,6,7,8,9,10]} changeScale={this.scaleChange}></Scale>
                <div>
                    <button onClick={this.submitStates}>SUBMIT</button>
                </div>
            </div>
        )
    }
}

export default Form;
