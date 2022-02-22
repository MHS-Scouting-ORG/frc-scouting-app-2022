import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Textbox from "./Textbox";
import Initials from "./Initials";
import Dropdown from "./Dropdown";
import Scale from "./Scale";

class Form extends React.Component{
    constructor(props){
        super(props);
        this.initialsChange = this.initialsChange.bind(this);
        this.changeTeamNumber = this.changeTeamNumber.bind(this);
        this.getMatchTeams = this.getMatchTeams.bind(this);
        this.changeMatchNumber = this.changeMatchNumber.bind(this);
        this.dropDownChanged = this.dropDownChanged.bind(this);
        this.makeDropDownBox = this.makeDropDownBox.bind(this);
        this.inputBoxChanged = this.inputBoxChanged.bind(this);
        this.buttonMinus = this.buttonMinus.bind(this);
        this.buttonPlus = this.buttonPlus.bind(this);
        this.makeInputBox = this.makeInputBox.bind(this);
        this.checkBoxClicked = this.checkBoxClicked.bind(this);
        this.makeCheckBox = this.makeCheckBox.bind(this);
        this.setComment = this.setComment.bind(this);
        this.scaleChange = this.scaleChange.bind(this);
        this.submitStates = this.submitStates.bind(this);
        this.newElement = this.newElement.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
        this.state = {
            statistics: {
                totalPoints: 0,
                lowHubAccuracy: 0,
                highHubAccuracy: 0
            },
            scouterInitials:"",
            teamNumber:"",
            matchNumber:"",
            dropDownBoxValues:["","","",""],
            inputBoxValues:[0,0,0,0,0,0,0,0,0,0,0],
            rankingPoints:"",
            checkBoxValues:[false,false,false,false,false,false,false,false,false,false,false],
            comment:"",
            scale:0,
            radical: 0
        };
    }

    /*
    fetch('https://www.thebluealliance.com/api/v3/event/2022hiho/matches', {mode: 'cors', headers:{'X-TBA-Auth-Key': 'TKWj89sH9nu6hwIza0zK91UQBRUaW5ETVJrZ7KhHOolwmuKxKqD3UkQMAoqHahsn'}})
        .then(response => response.json())
        .catch(err => console.log(err))
        .then(data => console.log(data)) */
        

    initialsChange(event){
        this.setState({scouterInitials:event.target.value.toUpperCase()});
    }

    changeTeamNumber(event,fill){
        this.setState({teamNumber:event.target.value});
    }

    getMatchTeams(url = '', data = {}){
        const teams = () => {
            fetch('https://www.thebluealliance.com/api/v3/event/2016nytr/matches',{
                mode: 'cors',
                headers:{
                    'X-TBA-Auth-Key': '47dyFWjomANFVkIVhafvIf2tFVzuvNsJ9iBOznH89PDotuFbEaSiSB6HpzBxlPZy'
                }
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        }
        teams();
    }


            /*return ()
        console.log(teams.json());
        return teams.json();

            /* Example POST method implementation:
            async function postData(url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
            }*/

    changeMatchNumber(event,fill){
        this.setState({matchNumber:event.target.value});
    } 

    incrementNumber(){
        this.setState({radical: this.inputBoxValues + 1})
    }

    decreaseNumber(){
        this.setState({radical: this.inputBoxValues - 1})
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
                    button={this.incrementNumber}
                    button={this.decreaseNumber}
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

    newElement(xPos,yPos){
        /**insert good code here */
        let position = [xPos,yPos]
        return (
            console.log(position)
        )
    }

    onClickCreate(event) {
        var xPos = event.clientX;
        var yPos = event.clientY;
        this.newElement(xPos,yPos);
    }
      

    render(){
        return(
            <div>
                <h1>FORM</h1>
                <Initials changeInitials={this.initialsChange}/>
                <Input setState={this.changeMatchNumber} label={"Match Number: "}></Input>
                <button onClick={this.getMatchTeams}>MATCH TEAMS</button>
                <Input setState={this.changeTeamNumber} label={"Team Number: "}></Input>
                {this.makeDropDownBox("Alliance Color: ",["Blue","Red"],0)}
                <h3>AUTONOMOUS</h3>
                {this.makeInputBox("# Low Hub Made: ",0)}
                {this.makeInputBox("# Low Hub Missed: ",1)}
                {this.makeInputBox("# Upper Hub Made: ",2)}
                {this.makeInputBox("# Upper Hub Missed: ",3)}
                {this.makeDropDownBox("Taxi: ",["No","Yes"],1)}
                <img onClick={this.onClickCreate} src='./images/TARRRRRMAC.PNG'/>
                {/* */}
                <h3>TELE-OP</h3>
                {this.makeInputBox("# Low Hub Made: ",4)}
                {this.makeInputBox("# Low Hub Missed: ",5)}
                {this.makeInputBox("# Upper Hub Made: ",6)}
                {this.makeInputBox("# Upper Hub Missed: ",7)}
                {this.makeDropDownBox("Hangar: ",["None","Attempted","Low","Mid","High","Traversal"],2)}
                {this.makeInputBox("# of fouls: ",8)}
                {this.makeInputBox("# of tech fouls",9)}
                {this.makeCheckBox("Yellow card: ",0)}
                {this.makeCheckBox("Red card: ", 1)}
                {this.makeCheckBox("Disabled: ", 2)}
                {this.makeCheckBox("Disqualifed: ", 3)}
                {this.makeCheckBox("Hangar Bonus: ", 4)}
                {this.makeCheckBox("Cargo Bonus: ", 5)}
                {this.makeDropDownBox("Ranking Points: ",[0,1,2,3,4],3)}
                <h3>PRIORITIES & STRATEGIES</h3>
                {this.makeCheckBox("Low Hub Shooter: ", 6)}
                {this.makeCheckBox("Upper Hub Shooter: ", 7)}
                {this.makeCheckBox("Launchpad Shooter: ", 8)}
                {this.makeCheckBox("Hangar: ", 9)}
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
