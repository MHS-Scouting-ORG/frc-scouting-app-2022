import Dropdown from "./Dropdown";
import Checkbox from "./CheckBox";
import Textbox from "./TextBox";
import Input from "./Input";
import React from "react";

class PreScoutingForm extends React.Component{
    constructor(props){
        super(props);
        this.teamNumberScouted = this.teamNumberScouted.bind(this);
        this.setComment = this.setComment.bind(this);
        this.strategyBoxClicked = this.strategyBoxClicked.bind(this);
        this.setBrokenBot = this.setBrokenBot.bind(this);
        this.makeStrategyBox = this.makeStrategyBox.bind(this);
        this.makeBrokenBot = this.makeBrokenBot.bind(this);
        this.submitStates = this.submitStates.bind(this);

        this.state = {
            teamNumber: "",
            strategyValues: [false,false,false,false,false],
            comment: "",
            brokenBot: false,
        }
    }

    teamNumberScouted(event){
        this.setState({teamNumber: event.target.value})
    }

    setComment(event){
        this.setState({comment: event.target.value})
    }

    strategyBoxClicked(){
        let strategyStates = this.state.strategyValues;
        strategyValues[i] = !strategyStates[i];
    }

    setBrokenBot(){
        let brokenState = this.state.brokenBot;
        brokenBot[i] = !brokenState[i];
    }

    makeStrategyBox(name,i){
        return (
            <div>
                <Checkbox
                    title={name}
                    changeState={this.strategyBoxClicked}
                    place={i}
                />
            </div>
        )
    }
    
    makeBrokenBot(name,i){
        return(
            <div>
                <Checkbox
                    title={name}
                    changeState={this.setBrokenBot}
                    place={i}
                />
            </div>
        )
    }

    submitStates(){
        let vals = this.state.strategyValues;
        let broken = this.state.brokenBot;
        let team = this.state.teamNumber;
        let text = this.state.comment;

        console.log(vals, broken, team, text);
    }

    render(){
        return(
            <div>
                <h1>PRE-SCOUTING FORM</h1>
                <Input setState={this.teamNumberScouted} label={"Team Number: "}></Input>
                {this.setBrokenBot("Broken Robot: ", 0)}
                <h2> PRIORITIES & STRATEGIES </h2>
                {this.makeStrategyBox("Low Hub Shooter: ", 0)}
                {this.makeStrategyBox("Upper Hub Shooter: ", 1)}
                {this.makeStrategyBox("Launchpad Shooter: ", 2)}
                {this.makeStrategyBox("Hangar: ", 3)}
                {this.makeStrategyBox("Defense: ", 4)}
                <Textbox title={"Comments: "} commentState={this.setComment}></Textbox>
                <div>
                <button onClick={this.submitStates}>SUBMIT</button>
                </div>
            </div>
        )
    }

}

export default PreScoutingForm;