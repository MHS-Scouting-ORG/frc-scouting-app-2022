import React, { useState } from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Textbox from "./Textbox";
import Dropdown from "./Dropdown";
import HangarDropdown from "./HangarDropdown";
import Scale from "./Scale";
import MatchDropdown from "./MatchDropdown";
//import ImageMarker from "react-image-marker";
import Header from './Header';
import api from "../../api/index"; 
//import React, { useState, useEffect } from 'react';

import classes from './Form.module.css';

class Form extends React.Component{
    constructor(props){
        super(props);
        //this.initialsChange = this.initialsChange.bind(this);
        //this.changeTeamNumber = this.changeTeamNumber.bind(this);

        this.changeMatchType = this.changeMatchType.bind(this);
        this.changeTypeNumber = this.changeTypeNumber.bind(this);
        this.changeMatchNumber = this.changeMatchNumber.bind(this);
        this.makeMatchTypeNumberDropdown = this.makeMatchTypeNumberDropdown.bind(this);
        this.makeMatchDropdown = this.makeMatchDropdown.bind(this);

        this.getMatchTeams = this.getMatchTeams.bind(this);
        this.changeTeam = this.changeTeam.bind(this);
        this.makeTeamDropdown = this.makeTeamDropdown.bind(this);
        //this.changeMatchNumber = this.changeMatchNumber.bind(this);

        this.changeMatchOverride = this.changeMatchOverride.bind(this);
        this.makeMatchOverride = this.makeMatchOverride.bind(this);

        this.dropDownChanged = this.dropDownChanged.bind(this);
        this.makeDropDownBox = this.makeDropDownBox.bind(this);

        this.changeHangar = this.changeHangar.bind(this);
        this.changeHangarStart = this.changeHangarStart.bind(this);
        this.changeHangarEnd = this.changeHangarEnd.bind(this);
        this.makeHangarStartEndBoxes = this.makeHangarStartEndBoxes.bind(this);
        this.makeHangarDropdownBox = this.makeHangarDropdownBox.bind(this);

        this.inputBoxChanged = this.inputBoxChanged.bind(this);
        this.buttonMinus = this.buttonMinus.bind(this);
        this.buttonPlus = this.buttonPlus.bind(this);
        this.makeInputBox = this.makeInputBox.bind(this);

        this.newElement = this.newElement.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);

        /*this.checkBoxClicked = this.checkBoxClicked.bind(this);
        this.makeCheckBox = this.makeCheckBox.bind(this);*/

        this.penaltyBoxClicked = this.penaltyBoxClicked.bind(this);
        this.makePenaltyBox = this.makePenaltyBox.bind(this);

        this.whoWonClicked = this.whoWonClicked.bind(this);
        this.makeWhoWonButton = this.makeWhoWonButton.bind(this);
        this.bonusBoxClicked = this.bonusBoxClicked.bind(this);
        this.makeBonusBox = this.makeBonusBox.bind(this);

        this.strategyBoxClicked = this.strategyBoxClicked.bind(this);
        this.makeStrategyyBox = this.makeStrategyBox.bind(this);

        this.setComment = this.setComment.bind(this);
        this.scaleChange = this.scaleChange.bind(this);
        this.submitStates = this.submitStates.bind(this);

        this.overrideChange = this.overrideChange.bind(this);
        this.overrideCheckbox = this.overrideCheckbox.bind(this);

        this.setMarkers = this.setMarkers.bind(this);


        //this.dropDownTarmac = this.dropDownTarmac.bind(this);



        this.state = {
            totalPoints: 0,
            lowHubAccuracy: 0,
            highHubAccuracy: 0,
            matchType:"",
            number:"",
            matchNumber:"",
            teams:["team1","team2","team3","team4","team5","team6"],
            teamNumber:'',
            matchOverride:false,
            dropDownBoxValues:["","",""],
            hangarValues:['','',''],
            matchData:'not found',
            //autoPosition:[0,0],
            inputBoxValues:[0,0,0,0,0,0,0,0,0,0],
            penaltyValues:[' ',' ',' ',' ',' '],
            whoWon:'',
            whoWonChecked:[' ',' '],
            bonusValues:[' ',' '],
            whoWon:'',
            strategyValues:[' ',' ',' ',' ',' '],
            rankingPoints:0,
            comment:"",
            scale:0,
            markers: [],
            tarmacSection: 0,
            override:false,

            summaryComm: ''
        };
    }
    
    setMarkers(event){
        this.setState({markers: [event[0]]})
        console.log(event)
    }

    /*initialsChange(event){
        this.setState({scouterInitials:event.target.value.toUpperCase()});
    }*/

    changeMatchType(event){
        let matchType = event;
        if(matchType === 'q'){
            this.setState({number:''});
        }
        this.setState({matchType:event});
        this.setState({teams:["team1","team2","team3","team4","team5","team6"]});
        this.setState({teamNumber:''});
    }
    
    changeTypeNumber(event){
        this.setState({number:(event.target.value)});
        this.setState({teams:["team1","team2","team3","team4","team5","team6"]});
        this.setState({teamNumber:''});
    }
    
    changeMatchNumber(event){
        if(event.target.value !== 0){
            this.setState({matchOverride:false});
        }
        this.setState({matchNumber:event.target.value});
        this.setState({teams:["team1","team2","team3","team4","team5","team6"]});
        this.setState({teamNumber:''});
    }

    makeMatchTypeNumberDropdown(matchType){
        if(matchType === 'qf' || matchType === 'sf' || matchType === 'f'){    
            return (
                <input onChange={this.changeTypeNumber}></input>
            )
        }
    }

    makeMatchDropdown(){
        return (
            <div>
                <MatchDropdown
                    setMatchType={this.changeMatchType}
                    setTypeNumber={this.changeTypeNumber}
                    makeNumberDropdown={this.makeMatchTypeNumberDropdown}
                    setMatchNumber={this.changeMatchNumber}
                />
            </div>
        )
    }

    async getMatchTeams(){
        let matchKey = /*put this years event key here*//* "2022casd" *//* */await api.getRegional()/* */ + "_" + this.state.matchType + this.state.number + "m" + this.state.matchNumber;
        const teams = async () => {
            await fetch('https://www.thebluealliance.com/api/v3/event/' + /* '2022casd' */ /**/ await api.getRegional() /**/ + '/matches',{
                mode: 'cors',
                headers:{
                    //'X-TBA-Auth-Key': '47dyFWjomANFVkIVhafvIf2tFVzuvNsJ9iBOznH89PDotuFbEaSiSB6HpzBxlPZy'
                    'X-TBA-Auth-Key': await api.getBlueAllianceAuthKey()
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.map((matches) => {
                    if(matches.key === matchKey){
                        this.setState({matchData:matches})
                        this.setState({teams:matches.alliances.blue.team_keys.concat(matches.alliances.red.team_keys)});
                        console.log(matches.alliances.blue.team_keys.concat(matches.alliances.red.team_keys));
                    }
                })
            })
            .catch(err => console.log(err))
        }
        console.log(matchKey);
        teams();
    }

//--------------------------------------------------------------------------------------------------------------------
    
    changeTeam(event){
        this.setState({teamNumber:event.target.value});
        let data = this.state.matchData;
        let chosenTeam = event.target.value
        let teamColor = "red";
        data.alliances.blue.team_keys.map((team) => {
            if(team === chosenTeam){
                teamColor = 'blue';
            }
        })
        let whoWon = '';
        let wonState = this.state.whoWon;
        if(wonState === ''){
            if(data.alliances.blue.score > data.alliances.red.score){
                whoWon = 'blue';
            }
            else if(data.alliances.blue.score < data.alliances.red.score){
                whoWon = 'red';
            }
            else if(data.alliances.blue.score == data.alliances.blue.score){
                whoWon = 'tied'
            }
        }
        else if(wonState === 'blue'){
            whoWon = 'blue';
        }
        else if(wonState === 'red'){
            whoWon = 'red';
        }
        else if(wonState === 'tied'){
            whoWon = 'tied';
        }

        if(teamColor === whoWon){
            this.setState({rankingPoints:2});
        }
        else if(whoWon === 'tied'){
            this.setState({rankingPoints:1});
        }
        else{
            this.setState({rankingPoints:0})
        }
        this.setState({whoWon:''});
        this.setState({bonusValues:[' ',' ']});
        this.setState({whoWonChecked:[' ',' ']})
    }

//--------------------------------------------------------------------------------------------------------------------



    makeTeamDropdown(){
        let alliances = this.state.teams; //this.getMatchTeams();*/
        console.log(this.state.matchNumber)
        return parseInt(this.state.matchNumber) !== 0 ?  (
            <div>
                <select onChange={this.changeTeam}>
                    <option></option>
                    {alliances.map((alliance) => <option key={alliance}> {alliance} </option>)}
                </select>
            </div>
        ) : (
            <div>
                <input type='number' onChange={e => { console.log(e.target.value)
                    this.setState({teamNumber: 'frc' + e.target.value})
                    }}/>
                <Textbox title={"Summary Comment: "} commentState={evt => {this.setState({summaryComm: evt.target.value})}} />
            </div>
        )
    }

    /*changeMatchNumber(event,fill){
        this.setState({matchNumber:event.target.value});
    }*/

    changeMatchOverride(){
        this.setState({matchOverride:!this.state.matchOverride});
    }

    makeMatchOverride(label){
        return(
            <Checkbox
                label={label}
                changeState={this.changeMatchOverride}
                checked={this.state.matchOverride}
            />
        )
    }



    dropDownChanged(event,i){
        let dropDownStates = this.state.dropDownBoxValues;
        dropDownStates[i] = event.target.value
    }



    makeDropDownBox(title,options,i){
        return (
            <div>
                <Dropdown
                    title={title}
                    choices={options}
                    place={i}
                    setState={this.dropDownChanged}
                />
            </div>
        )
    }
/*
    makeMatchTypeNumberDropdown(matchType){
        if(matchType === 'qf' || matchType === 'sf' || matchType === 'f'){    
            return (
                <input onChange={this.changeTypeNumber}></input>
            )
        }
    }

    makeMatchDropdown(){
        return (
            <div>
                <MatchDropdown
                    setMatchType={this.changeMatchType}
                    setTypeNumber={this.changeTypeNumber}
                    makeNumberDropdown={this.makeMatchTypeNumberDropdown}
                    setMatchNumber={this.changeMatchNumber}
                />
            </div>
            )
        }
        */

    changeHangar(event){
        let hangar = Array(this.state.hangarValues);
        hangar[0] = event.target.value;
        this.setState({hangarValues: hangar})
    }

    changeHangarStart(event){
        let hangarValues = this.state.hangarValues;
        hangarValues[1] = event.target.value;
    }

    changeHangarEnd(event){
        let hangarValues = this.state.hangarValues;
        hangarValues[2] = event.target.value;
    }

    makeHangarStartEndBoxes(){
        let hangarVals = this.state.hangarValues;
        let hangar = hangarVals[0];
        if(hangar !== "None" && hangar !== ""){
            if(hangar === "Attempted"){
                return (
                    <div>
                        <label> {"Hangar Start: "}
                            <input className={classes.Input} type="number" onChange={this.changeHangar}></input>
                        </label>
                    </div>
                )
            }
            else{
                return (
                    <div>
                        <div>
                            <label> {"Hangar Start: "}
                                <input className={classes.Input} type="number" onChange={this.changeHangarStart}></input>
                            </label>
                        </div>
                        <div>
                            <label> {"Hangar End: "}
                                <input className={classes.Input} type="number" onChange={this.changeHangarEnd}></input>
                            </label>
                        </div>
                    </div>
                )
            } 
        }
        else {
            return <div></div>;
        }
    }

    makeHangarDropdownBox(){
        return (
            <div>
                <HangarDropdown
                    changeHangarUsed={this.changeHangar}
                    makeHangarStartEndBoxes={this.makeHangarStartEndBoxes}
                />
            </div>
        )
    }

    //--------------------------------------------------------------------------------------------------------------------------

    inputBoxChanged(event,i){
        let inputStates = this.state.inputBoxValues;
        if(event.target.value === ''){
            inputStates[i] = 0;
        }
        else{
            inputStates[i] = event.target.value;
        }
    }

    buttonMinus(event,i){
        let inputStates = this.state.inputBoxValues;
        if(inputStates[i] > 0){
            inputStates[i] = parseInt(inputStates[i]) - 1;
        }
        else if(inputStates[i] <= 0){
            inputStates[i] = 0;
        }
    }

    buttonPlus(event,i){
        let inputStates = this.state.inputBoxValues;
        if(inputStates[i] >= 0){
            inputStates[i] = parseInt(inputStates[i]) + 1;
        }
        else if(inputStates[i] < 0){
            inputStates[i] = 0;
        }
    }

    makeInputBox(title,i){
        let inputStates = this.state.inputBoxValues;
        return (
            <div>
                <Input
                    label={title}
                    setState={this.inputBoxChanged}
                    place={i}
                    state={inputStates[i]}
                    minusButton={this.buttonMinus}
                    plusButton={this.buttonPlus}
                />
            </div>
        )
    }

    //--------------------------------------------------------------------------------------------------------------------------


    newElement(xPos,yPos){
        /**insert good code here */
        let position = [xPos,yPos]
        return (
            console.log(position)
        )
    }

    onClickCreate(event) {
        let xPos = event.clientX;
        let yPos = event.clientY;
        let totalPosition = this.state.autoPosition;
        totalPosition[0] = xPos;
        totalPosition[1] = yPos;
        this.newElement(xPos,yPos);
    }
/*
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
*/

//--------------------------------------------------------------------------------------------------------------------------

    penaltyBoxClicked(i,label){
        let penaltyStates = this.state.penaltyValues;
        if(penaltyStates[i] === label){
            penaltyStates[i] =  ' ';
        }
        else if(penaltyStates[i] === ' '){
            penaltyStates[i] = label;
        }
    }



    makePenaltyBox(name,i){
        return (
            <div>
                <Checkbox
                    label={name}
                    changeState={this.penaltyBoxClicked}
                    place={i}
                />
            </div>
        )
    }
    

    whoWonClicked(i,label){
        let teamWon = label;
        this.setState({whoWon:teamWon});
        let data = this.state.matchData;
        console.log(data);
        if(data === 'not found'){
            window.alert("GET MATCH TEAMS FIRST");
        }
        else{
            let chosenTeam = this.state.teamNumber;
            let teamColor = 'Red Won ';
            data.alliances.blue.team_keys.map((team) => {
                if(team.substring(4,team.length) === chosenTeam){
                    teamColor = 'Blue Won '
                }
            })

            if(teamWon === teamColor){
                this.setState({rankingPoints:2});
            }
            else if(teamWon === 'Tied '){
                this.setState({rankingPoints:1});
            }
            else{
                this.setState({rankingPoints:0});
            }
            this.setState({bonusValues:[' ',' ']});

            let checked = this.state.whoWonChecked;
            checked[i - 1] = ' ';
            checked[i - 2] = ' ';
            checked[i + 1] = ' ';
            checked[i + 2] = ' ';
            if(checked[i] === label){
                checked[i] = ' ';
            }
            else if(checked[i] === ' '){
                checked[i] = label;
            }
        }
    }

    makeWhoWonButton(name,i){
        let whoWon = this.state.whoWonChecked;
        let checkedValue;
        
        if(whoWon[i] === name){
            checkedValue = true;
        }
        else if(whoWon[i] ===  ' '){
            checkedValue = false;
        }

        return (
            <Checkbox
                    label={name}
                    changeState={this.whoWonClicked}
                    place={i}
                    checked={checkedValue}
            />
        )
    }

    bonusBoxClicked(i,label){
        let bonusStates = this.state.bonusValues;
        if(bonusStates[i] === label){
            this.setState({rankingPoints:this.state.rankingPoints - 1});
        }
        else if(bonusStates[i] === ' '){
            this.setState({rankingPoints:this.state.rankingPoints + 1});
        }

        if(bonusStates[i] === label){
            bonusStates[i] = ' ';
        }
        else if(bonusStates[i] === ' '){
            bonusStates[i] = label;
        }
    }

    makeBonusBox(name,i){
        let bonusStates = this.state.bonusValues;
        let checkedValue;
        if(bonusStates[i] === name){
            checkedValue = true;
        }
        else if(bonusStates[i] === ' '){
            checkedValue = false;
        }
        return (
            <div>
                <Checkbox
                    label={name}
                    changeState={this.bonusBoxClicked}
                    place={i}
                    checked={checkedValue}
                />
            </div>
        )
    }

    whoWonClicked(i,label){
        let data = this.state.matchData;
        if(data === 'not found'){
            window.alert("PICK A TEAM FIRST");
        }
        else{
            if(label === 'Team Won '){
                this.setState({rankingPoints:2});
            }
            else if(label === 'Team Tied '){
                this.setState({rankingPoints:1});
            }
            this.setState({bonusValues:[' ',' ']})

            let whoWon = this.state.whoWonChecked
            whoWon[i - 1] = ' ';
            whoWon[i + 1] = ' ';
            if(whoWon[i] === label){
                whoWon[i] = ' ';
            }
            else if(whoWon[i] === ' '){
                whoWon[i] = label;
            }

            if(whoWon[0] === ' ' && whoWon[1] === ' '){
                this.setState({rankingPoints:0});
            }
        }
    }

    makeWhoWonButton(name,i){
        let whoWon = this.state.whoWonChecked;
        let checkedValue;
        if(whoWon[i] === name){
            checkedValue = true;
        }
        else if(whoWon[i] === ' '){
            checkedValue = false;
        }

        return (
            <Checkbox
                label={name}
                changeState={this.whoWonClicked}
                place={i}
                checked={checkedValue}
            />
        )
    }
    
    strategyBoxClicked(i,label){
        let strategyStates = this.state.strategyValues;
        if(strategyStates[i] === label){
            strategyStates[i] = ' ';
        }
        else if(strategyStates[i] === ' '){
            strategyStates[i] = label;
        }
    }

    makeStrategyBox(name,i){
        return (
            <div>
                <Checkbox
                    label={name}
                    changeState={this.strategyBoxClicked}
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

    overrideChange(fill,filler){
        this.setState({override:!this.state.override});
    }

    overrideCheckbox(){
        return(
            <div>
                <Checkbox
                    label={'Override '}
                    changeState={this.overrideChange}
                />
            </div>
        )
    }

    async submitStates(){
        let vals = this.state.inputBoxValues;

        let lowTeleMade = parseInt(vals[4]);
        let lowAutoMade = parseInt(vals[0]);
        let highTeleMade = parseInt(vals[6]);
        let highAutoMade = parseInt(vals[2]);
        let lowMissed = parseInt(vals[1]) + parseInt(vals[5]);
        let highMissed = parseInt(vals[3]) + parseInt(vals[7]);

        let dropboxVals = this.state.dropDownBoxValues;
        let taxiBox = dropboxVals[0];
        let taxiValue;
        let autoPosition = dropboxVals[1];

        let hangarValues = this.state.hangarValues;
        let hangarUsed = hangarValues[0];
        let hangarStart = hangarValues[1];
        let hangarEnd = hangarValues[2];

        let driveSpeed = dropboxVals[2];
        let driveTurning = dropboxVals[3];
        let driveStrength = dropboxVals[4];

        let taxiPoints = 0;
        let hangarPoints = 0;

        if(taxiBox === "Yes"){
            taxiPoints = 2;
            taxiValue = true;
        } else if(taxiBox === "No"){
            taxiPoints = 0;
            taxiValue = false;
        }
        if(hangarUsed === "Low"){
            hangarPoints = 4;
        } else if(hangarUsed === "Mid"){
            hangarPoints = 6;
        } else if(hangarUsed === "High"){
            hangarPoints = 10;
        } else if(hangarUsed === "Traversal"){
            hangarPoints = 15;
        } else if(hangarUsed === "None" || hangarUsed === "Attempted"){
            hangarPoints = 0;
        }
        
        let points =  taxiPoints + hangarPoints + (lowTeleMade + (2 * ( lowAutoMade + highTeleMade + ( highAutoMade * 2 ))));
        let lowAccuracy = 100 * (( lowAutoMade + lowTeleMade ) / ( lowMissed + lowAutoMade + lowTeleMade ));
        let highAccuracy = 100 * (( highTeleMade + highAutoMade ) / ( highMissed + highAutoMade + highTeleMade ));
            
        this.setState({
            totalPoints: points,
            lowHubAccuracy: lowAccuracy,
            highHubAccuracy: highAccuracy,
        })
        console.log(this.state);
        console.log(points, lowAccuracy, highAccuracy);

        /*if(teamNumber === false){
            windowAlertMessage + "\n";
        }
        */
        let penalties = this.state.penaltyValues;
        let bonuses = this.state.bonusValues;
        let strategies = this.state.strategyValues;
        let strats = this.state.strategyValues;
        let incompletePriorities = true;
        let scale = parseInt(this.state.scale);

        let incompleteForm = false;
        let windowAlertMessage = 'Form is incomplete, you still need to fill out: ';

        /*vals.filter(value => {
            if(value == ''){
                incompleteForm = true;
            }
        })

        dropboxVals.filter(value => {
            if(value == ''){
                incompleteForm = true;
            }
        })*/

        if(this.state.matchType === 'qf' || this.state.matchType === 'sf' || this.state.matchType === 'f'){
            if(this.state.number === ''){
                incompleteForm = true;
                windowAlertMessage = windowAlertMessage + "\nFinals Number"
            }
        }
        else if(this.state.matchType === ''){
            incompleteForm = true;
            windowAlertMessage = windowAlertMessage + "\nMatch Type (Qualifications, Quarterfinals, Semifinals, Finals)"
        }

        if(this.state.matchNumber === ''){
            incompleteForm = true;
            windowAlertMessage = windowAlertMessage + "\nMatch Number"
        }

        if(this.state.teamNumber === ''){
            incompleteForm = true;
            windowAlertMessage = windowAlertMessage + "\nTeam Number"
        }
        
        if(taxiBox === ''){
            incompleteForm = true;
            windowAlertMessage = windowAlertMessage + "\nTaxi"
        }

        if(taxiBox === false){
            taxiValue = "No";
        }
        else if(taxiBox === true){
            taxiValue = "Yes";
        }
        
        if(autoPosition === ''){
            incompleteForm = true;
            windowAlertMessage = windowAlertMessage + "\nPosition of robot during Autonomous"
        }

        if(hangarUsed === ''){
            incompleteForm = true;
            windowAlertMessage = windowAlertMessage + "\nWhat hangar the robot did"
        }
        else{
            if(hangarUsed !== "None"){
                if(hangarUsed === "Attempted"){
                    if(hangarStart === ''){
                        incompleteForm = true;
                        windowAlertMessage = windowAlertMessage + "\nWhat time the robot started hanging"
                    }
                }
                else{
                    if(hangarStart === ''){
                        incompleteForm = true;
                        windowAlertMessage = windowAlertMessage + "\nWhat time the robot started hanging"
                    }
                    if(hangarEnd === ''){
                        incompleteForm = true;
                        windowAlertMessage = windowAlertMessage + "\nWhat time the robot ended hanging"
                    }
                }
            }

        }
        if(driveSpeed === ''){
            incompleteForm = true;
            windowAlertMessage = windowAlertMessage + "\nHow fast is the robot drive"
        }
        
        if(driveTurning === ''){
            incompleteForm = true;
            windowAlertMessage = windowAlertMessage + "\nHow good is the turning of the robot drive"
        }

        if(driveStrength === ''){
            incompleteForm = true;
            windowAlertMessage = windowAlertMessage + "\nWhat strength is the robot drive"
        }

        strats.filter(strat => {
            if(strat !== ' '){
                incompletePriorities = false;
            }
        })

        if(incompletePriorities === true){
            incompleteForm = true;
            windowAlertMessage = windowAlertMessage + "\nRobot priorities/strategies"
        }

        /*let hangarValues2 = this.state.hangarValues;
        let hangarUsed2 = hangarValues2[0];

        if(true){
            windowAlertMessage = windowAlertMessage + "\n" + hangarUsed2;
        }*/

        /*if(this.state.comment === ''){
            incompleteForm = true;
            windowAlertMessage = windowAlertMessage + "\nScouter comment"
        }*/

        if(scale === 0){
            incompleteForm = true;
            windowAlertMessage = windowAlertMessage + "\nPartnership scale"
        }

        let override = this.state.override;

        if(incompleteForm === true && override === false){
            window.alert(windowAlertMessage);
        }
        else if(incompleteForm === false || override === true){
            //console.log(this.state.teamNumber.substring(4,this.state.teamNumber.length));
            console.log(penalties)
            api.put({
                body: {
                    TeamId: this.state.teamNumber.substring(3,this.state.teamNumber.length),
                    MatchId: /* insert event key here /*/ /* "2022casd" *//* */ await api.getRegional() /* */ + "_" + this.state.matchType + this.state.number + "m" + this.state.matchNumber,
                    TotalPoints: Number(points),
                    LowHubAccuracy: Number(lowAccuracy),
                    UpperHubAccuracy: Number(highAccuracy),
                    AutoLowMade: Number(vals[0]),
                    AutoLowMissed: Number(vals[1]),
                    AutoUpperMade: Number(vals[2]),
                    AutoUpperMissed: Number(vals[3]),
                    Taxi: String(taxiValue),
                    AutoPlacement: Number(autoPosition),
                    TeleLowMade: Number(vals[4]),
                    TeleLowMissed: Number(vals[5]),
                    TeleUpperMade: Number(vals[6]),
                    TeleUpperMissed: Number(vals[7]),
                    Hangar: String(hangarUsed),
                    HangarStart: Number(hangarStart),
                    HangarEnd: Number(hangarEnd),
                    NumberOfFouls: Number(vals[8]),
                    NumberOfTech: Number(vals[9]),
                    Penalties: penalties,
                    HangarCargoBonus: bonuses,
                    NumberOfRankingPoints: Number(this.state.rankingPoints),
                    Strategy: strategies,
                    OpinionScale: Number(this.state.scale),
                    Comments: String(this.state.comment),
                    SummaryComment: String(this.state.summaryComm),
                }
            })//*/
            .then(window.alert("States have successfully been submitted to table")
            )
            .catch(err => {
                console.log(err)
            })
        }
        let regional = await api.getRegional();
        console.log(regional);
    }
      

    render(){
        return(
            <div>
                <h1>FORM</h1>
                {/*<Initials changeInitials={this.initialsChange}/>*/}
                <br></br>
                {this.makeMatchDropdown()}
                <button onClick={this.getMatchTeams}>GET MATCH TEAMS</button>
                {this.makeTeamDropdown()}
                <br/>
                {this.makeMatchOverride("Match Override ")}
                <br></br>
                <h3>AUTONOMOUS</h3>
                <img className={classes.TarmacImage} src={'./images/tarmac.jpg'} prop={"Tarmac"}></img>
                {this.makeDropDownBox("Auto Position On Tarmac: ",[1,2,3,4,5,6,7,8],1)}
                {this.makeInputBox("# Low Hub Made: ",0)}
                {this.makeInputBox("# Low Hub Missed: ",1)}
                {this.makeInputBox("# Upper Hub Made: ",2)}
                {this.makeInputBox("# Upper Hub Missed: ",3)}
                {this.makeDropDownBox("Taxi: ",["No","Yes"],0)}
                {/*<ImageMarker src={'./images/TARRRRRMAC.PNG'} markers={this.state.markers} onAddMarker={(marker) => this.setMarkers([marker])}></ImageMarker>*/}
                {/* */}
                <br></br>
                <h3>TELE-OP</h3>
                {this.makeInputBox("# Low Hub Made: ",4)}
                {this.makeInputBox("# Low Hub Missed: ",5)}
                {this.makeInputBox("# Upper Hub Made: ",6)}
                {this.makeInputBox("# Upper Hub Missed: ",7)}
                {/*this.makeDropDownBox("Hangar: ",["None","Attempted","Low","Mid","High","Traversal"],2)*/}
                <br/>
                {this.makeInputBox("# of fouls: ",8)}
                {this.makeInputBox("# of tech fouls",9)}
                <br/>
                {this.makeHangarDropdownBox()}
                {this.makeHangarStartEndBoxes()}
                <br/>
                {/*<p> Scale of 1-3, rate drive (slow, average, fast)) </p>
                <Scale values={[1,2,3]} changeScale={this.scaleChange}></Scale>*/}
                {/*<Dropdown choices={["Slow", "Average", "Fast"]} title={"Drive Speed: "} setState={this.dropDownChanged} place={2}/>*/}
                {this.makeDropDownBox("Drive Speed: ", ["Slow","Average","Fast"],2)}
                {this.makeDropDownBox("Drive Turning: ", ["Bad","Okay","Good"],3)}
                {this.makeDropDownBox("Drive Strength: ", ["Weak", "Normal", "Strong"],4)}

                {this.makePenaltyBox("Yellow card ",0)}
                {this.makePenaltyBox("Red card ", 1)}
                {this.makePenaltyBox("Disabled ", 2)}
                {this.makePenaltyBox("Disqualifed ", 3)}
                {this.makePenaltyBox("Bot Broke ", 4)}
                <br></br>
                {this.makeWhoWonButton("Team Won ", 0)}
                {this.makeWhoWonButton("Team Tied ", 1)}
                {this.makeBonusBox("Hangar Bonus ", 0)}
                {this.makeBonusBox("Cargo Bonus ", 1)}
                <Header display={this.state.rankingPoints} bonus={this.state.bonusValues}/>
                <br></br>
                <h3>PRIORITIES & STRATEGIES</h3>
                {this.makeStrategyBox("Low Shooter ", 0)}
                {this.makeStrategyBox("Upper Shooter ", 1)}
                {this.makeStrategyBox("Hangar ", 3)}
                {this.makeStrategyBox("Defense ", 4)}
                <br></br>
                <p>How well is there defense if any? Note if the robot is prone to tipping?</p>
                <Textbox title={"Comments: "} commentState={this.setComment}></Textbox>
                {this.overrideCheckbox()
                }
                <div>
                    <button onClick={this.submitStates}>SUBMIT</button>
                </div>
            </div>
        )
    }
}

export default Form;
