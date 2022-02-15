import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Textbox from "./Textbox";
import Dropdown from "./Dropdown";
import Initials from "./Initials";

class Form extends React.Component{
    constructor(props){
        super(props);
        this.checkBoxClicked = this.checkBoxClicked.bind(this);
        this.makeCheckBox = this.makeCheckBox.bind(this);
        this.checkState = this.checkState.bind(this);
        this.state = {
            checkBoxValues:[false,false,false,false,false,false],
            Comment:"",
            scoutInitials: ""
        };
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

    changeInput(){
        
    }

    render(){
        return(
            <div>
                <h1> FORM </h1>
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
            </div>
        )
    }
}

export default Form;
