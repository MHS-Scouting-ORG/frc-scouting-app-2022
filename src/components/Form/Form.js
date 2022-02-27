import React, { useState } from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Textbox from "./Textbox";
import Initials from "./Initials";
import Dropdown from "./Dropdown";
import Scale from "./Scale";
import MatchDropdown from "./MatchDropdown";
import ImageMarker from "react-image-marker";

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

        this.dropDownChanged = this.dropDownChanged.bind(this);
        this.makeDropDownBox = this.makeDropDownBox.bind(this);

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
        this.bonusBoxClicked = this.penaltyBoxClicked.bind(this);
        this.makeBonusBox = this.makePenaltyBox.bind(this);
        this.strategyyBoxClicked = this.penaltyBoxClicked.bind(this);
        this.makeStrategyyBox = this.makePenaltyBox.bind(this);

        this.setComment = this.setComment.bind(this);
        this.scaleChange = this.scaleChange.bind(this);
        this.submitStates = this.submitStates.bind(this);

        this.setMarkers = this.setMarkers.bind(this);



        this.state = {
            statistics: {
                totalPoints: 0,
                lowHubAccuracy: 0,
                highHubAccuracy: 0
            },
            scouterInitials:"",
            matchType:"",
            number:"",
            matchNumber:"",
            teams:["team1","team2","team3","team4","team5","team6"],
            dropDownBoxValues:["","","",""],
            matchData:[],
            autoPosition:[0,0],
            inputBoxValues:[0,0,0,0,0,0,0,0,0,0,0],
            checkBoxValues:[false,false,false,false,false,false,false,false,false,false,false],
            penaltyValues:[false,false,false,false],
            bonusValues:[false,false],
            strategyValues:[false,false,false,false,false],
            rankingPoints:"",
            strategy:'',
            comment:"",
            scale:0,
            markers: [],
        };
    }
    
        setMarkers(event){
            this.setState({markers: [event[0]]})
            console.log(event)
        }
    /* {
            Summary: {
                TotalPoints: 45,
                LowHubAccuracy: 75,
                UpperHubAccuracy: 85
            },

            MatchNumber: 123,
            TeamNumber: 12,

            AutoLowMade: 4,
            AutoLowMissed: 5,
            AutoUpperMade: 6,
            AutoUpperMissed: 7,

            Taxi: false,
            AutoPlacement: [x,y],

            TeleLowMade: 8,
            TeleLowMissed: 9,
            TeleUpperMade: 10,
            TeleUpperMissed: 11,

            Hangar: 15,

            NumberOfFouls: 0,
            NumberOfTech: 0,
            Penalties: [yellow, red, disabled, disqualified] // booleans, you can use an array

            HangarBonus: false,
            CargoBonus: false,
            NumberOfRankingPoints: 0,

            Strategy: [low shooter, high shooter, launchpad use, hangar, defense], // booleans, you can us an array

            Comments: '',
            OpinionScale: 0
        }
    
    */


    /*initialsChange(event){
        this.setState({scouterInitials:event.target.value.toUpperCase()});
    }*/

    changeMatchType(event){
        this.setState({matchType:event});
    }
    
    changeTypeNumber(event){
        this.setState({number:(event.target.value)});
    }
    
    changeMatchNumber(event){
        this.setState({matchNumber:event.target.value});
    }

    makeMatchTypeNumberDropdown(matchType){
        if(matchType === 'qf' || matchType === 'sf' || matchType === 'f'){
            
        }
        return (
            <input onChange={this.changeTypeNumber}></input>
        )
    }

    makeMatchDropdown(){
        return (
            <div>
                <MatchDropdown
                    setMatchType={this.changeMatchType}
                    setTypeNumber={this.changeTypeNumber}
                    //makeNumberDropdown={this.makeMatchTypeNumberDropdown}
                    setMatchNumber={this.changeMatchNumber}
                />
            </div>
        )
    }

    getMatchTeams(){
        let matchKey = /*put this years event key here*/ "2016nytr" + "_" + this.state.matchType + this.state.number + "m" + this.state.matchNumber;
        const teams = () => {
            fetch('https://www.thebluealliance.com/api/v3/event/2016nytr/matches',{
                mode: 'cors',
                headers:{
                    'X-TBA-Auth-Key': '47dyFWjomANFVkIVhafvIf2tFVzuvNsJ9iBOznH89PDotuFbEaSiSB6HpzBxlPZy'
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

    changeTeam(event){
        this.setState({teamNumber:event.target.value});
        let data = this.state.matchData;
        let chosenTeam = event.target.value
        let teamColor = "";
        data.alliances.blue.map((team) => {
            if(team === chosenTeam){
                teamColor = 'blue';
            }
            else{
                teamColor = 'red'
            }
        })
        let whoWon = '';
        if(data.alliances.blue.score > data.alliances.red.score){
            whoWon = 'blue';
        }
        else if(data.alliances.blue.score < data.alliances.red.score){
            whoWon = 'red';
        }
        else{
            whoWon = 'tied'
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
    }

    makeTeamDropdown(){
        let alliances = this.state.teams; //this.getMatchTeams();*/
        return (
            <div>
                <select onChange={this.changeTeam}>
                    <option></option>
                    {alliances.map((alliance) => <option key={alliance}> {alliance} </option>)}
                </select>
            </div>
        )
    }

    changeMatchNumber(event,fill){
        this.setState({matchNumber:event.target.value});
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

    inputBoxChanged(event,i){
        let inputStates = this.state.inputBoxValues;
        inputStates[i] = event.target.value;
    }

    buttonMinus(event,i){
        let inputStates = this.state.inputBoxValues;
        inputStates[i] = parseInt(inputStates[i]) - 1;
    }

    buttonPlus(event,i){
        let inputStates = this.state.inputBoxValues;
        inputStates[i] = parseInt(inputStates[i]) + 1;
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
                    /*minusButton={this.buttonMinus}
                    plusButton={this.buttonPlus}*/
                />
            </div>
        )
    }

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

    penaltyBoxClicked(i){
        let penaltyStates = this.state.penaltyValues;
        penaltyStates[i] = !penaltyStates[i];
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
    
    bonusBoxClicked(i){
        let bonusStates = this.state.bonusValues;
        bonusStates[i] = !bonusStates[i];
    }

    makeBonusBox(name,i){
        return (
            <div>
                <Checkbox
                    label={name}
                    changeState={this.bonusBoxClicked}
                    place={i}
                />
            </div>
        )
    }
    
    strategyBoxClicked(i){
        let strategyStates = this.state.strategyValues;
        strategyStates[i] = !strategyStates[i];
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

    submitStates(){
        let vals = this.state.inputBoxValues;
        let lowTeleMade = parseInt(vals[4]);
        let lowAutoMade = parseInt(vals[0]);
        let highTeleMade = parseInt(vals[6]);
        let highAutoMade = parseInt(vals[2]);
        let lowMissed = parseInt(vals[1]) + parseInt(vals[5]);
        let highMissed = parseInt(vals[3]) + parseInt(vals[7]);
        let checked = this.state.dropDownBoxValues;
        let taxiBox = checked[1];
        let hangarUsed = checked[2];
        let taxiPoints = 0;
        let hangarPoints = 0;
        if(taxiBox === "Yes"){
            taxiPoints = 2;
        } else if(taxiBox === "No"){
            taxiPoints = 0;
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
        let highAccuracy = 100 * (( highTeleMade + highAutoMade ) / ( highMissed + highAutoMade + highTeleMade ))
            
        this.setState({
            statistics: {
                totalPoints: points,
                lowHubAccuracy: lowAccuracy,
                highHubAccuracy: highAccuracy,
            }
        })

        console.log(this.state);
        console.log(points, lowAccuracy, highAccuracy);
    }
      

    render(){
        return(
            <div>
                <h1>FORM</h1>
                <Initials changeInitials={this.initialsChange}/>
                <br></br>
                {this.makeMatchDropdown()}
                <button onClick={this.getMatchTeams}>GET MATCH TEAMS</button>
                {this.makeTeamDropdown()}
                <br></br>
                <Input setState={this.changeTeamNumber} label={"Team Number: "}></Input>
                {this.makeDropDownBox("Alliance Color: ",["Blue","Red"],0)}
                <br></br>
                <h3>AUTONOMOUS</h3>
                {this.makeInputBox("# Low Hub Made: ",0)}
                {this.makeInputBox("# Low Hub Missed: ",1)}
                {this.makeInputBox("# Upper Hub Made: ",2)}
                {this.makeInputBox("# Upper Hub Missed: ",3)}
                {this.makeDropDownBox("Taxi: ",["No","Yes"],1)}
                <ImageMarker src={'./images/TARRRRRMAC.PNG'} markers={this.state.markers} onAddMarker={(marker) => this.setMarkers([marker])}></ImageMarker>
                {/* */}
                <br></br>
                <h3>TELE-OP</h3>
                {this.makeInputBox("# Low Hub Made: ",4)}
                {this.makeInputBox("# Low Hub Missed: ",5)}
                {this.makeInputBox("# Upper Hub Made: ",6)}
                {this.makeInputBox("# Upper Hub Missed: ",7)}
                {this.makeDropDownBox("Hangar: ",["None","Attempted","Low","Mid","High","Traversal"],2)}
                {this.makeInputBox("# of fouls: ",8)}
                {this.makeInputBox("# of tech fouls",9)}
                {this.makePenaltyBox("Yellow card: ",0)}
                {this.makePenaltyBox("Red card: ", 1)}
                {this.makePenaltyBox("Disabled: ", 2)}
                {this.makePenaltyBox("Disqualifed: ", 3)}
                {this.makeBonusBox("Hangar Bonus: ", 4)}
                {this.makeBonusBox("Cargo Bonus: ", 5)}
                {this.makeDropDownBox("Ranking Points: ",[0,1,2,3,4],3)}
                <br></br>
                <h3>PRIORITIES & STRATEGIES</h3>
                {this.makeStrategyBox("Low Hub Shooter: ", 6)}
                {this.makeStrategyBox("Upper Hub Shooter: ", 7)}
                {this.makeStrategyBox("Launchpad Shooter: ", 8)}
                {this.makeStrategyBox("Hangar: ", 9)}
                {this.makeStrategyBox("Defense: ", 10)}
                <br></br>
                <Textbox title={"Comments: "} commentState={this.setComment}></Textbox>
                <p> Scale of 1-10, rate partnership (how well you do think our alliances can work together) </p>
                <Scale values={[1,2,3,4,5,6,7,8,9,10]} changeScale={this.scaleChange}></Scale>
                <div>
                    <button onClick={this.submitStates}>SUBMIT</button>
                </div>
            </div>
        )
    }
}

export default Form;