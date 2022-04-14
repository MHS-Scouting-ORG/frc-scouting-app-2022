import Dropdown from "./Dropdown";
import Checkbox from "./CheckBox";
import Textbox from "./TextBox";
import Input from "./Input";
import React, { useState } from "react";
import api from "../../api";

class PreScoutingForm extends React.Component{
    constructor(props){
        super(props);
        this.teamNumberScouted = this.teamNumberScouted.bind(this);
        this.setComment = this.setComment.bind(this);
        this.strategyBoxClicked = this.strategyBoxClicked.bind(this);
        this.makeStrategyBox = this.makeStrategyBox.bind(this);
        this.submitStates = this.submitStates.bind(this);

        this.state = {
            teamNumber: "",
            strategyValues: [" ", " "],
            comment: "",
        }
    }

    teamNumberScouted(event){
        this.setState({teamNumber: event.target.value})
    }

    setComment(event){
        this.setState({comment: event.target.value})
    }

    strategyBoxClicked(i, label){
        let strategyStates = this.state.strategyValues;
        if(strategyStates[i] === label){
            strategyStates = " ";
        }
        
        else if(strategyStates === []){
            strategyStates = label;
        }
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

    submitStates(){
        let vals = this.state.strategyValues;
        let team = this.state.teamNumber;
        let text = this.state.comment;

        console.log(vals, team, text);

        api.put({
            body: {
                TeamNumber: Number(this.state.teamNumber),
                Strategy: Array(this.state.strategyValues),
                Comments: String(this.state.comment)
            }
        })
        .then(window.alert("You have submited the pre-scouting form!!"))
        .catch(err =>{
            console.log(err)
        })
    }

    render(){
        return(
            <div>
                <h1>PRE-SCOUTING FORM</h1>
                <Input setState={this.teamNumberScouted} label={"Team Number: "}></Input>
                {this.setBrokenBot("Broken Robot: ", 0)}
                <br></br>
                <br></br>
                <h2> PRIORITIES & STRATEGIES </h2>
                {this.makeStrategyBox("Low Hub Shooter: ", 0)}
                {this.makeStrategyBox("Upper Hub Shooter: ", 1)}
                {this.makeStrategyBox("Launchpad Shooter: ", 2)}
                {this.makeStrategyBox("Hangar: ", 3)}
                {this.makeStrategyBox("Defense: ", 4)}
                {this.makeStrategyBox("Broken Bot: ", 5)}
                <Textbox title={"Comments: "} commentState={this.setComment}></Textbox>
                <div>
                <button onClick={this.submitStates}>SUBMIT</button>
                </div>
            </div>
        )
    }

}

export default PreScoutingForm;