import React from 'react';

class MatchDropdown extends React.Component{
    constructor(props){
        super(props);
        this.inputWhichFinal = this.inputWhichFinal.bind(this);
    }

    inputWhichFinal(){
        if(true){

        }
    }

    changeTeamNumber(event,number){
        let matchType = event.target.value;
        if(matchType === "Qualification Match "){
            this.setState({matcheNumber:"qm"});
            return 'qm';
        } 
        else if(matchType === "Quarterfinals Match "){
            this.setState({matcheNumber:"qf"});
            return 'qf' + number;
        }
        else if(matchType === "Semifinals Match "){
            this.setState({matcheNumber:"sf"});
            return 'sf' + number;
        }
        else if(matchType === "Finals Match "){
            this.setState({matcheNumber:"f"});
            return 'f' + number;
        }
    }

    render(){
        return (
            <div>
                <label>
                    <select onChange={this.props.teamNumberPicked}>
                        <option></option>
                        <option> Qualification </option>
                        <option> Quarterfinal </option>
                        <option> Semifinal </option>
                        <option> Finals </option>
                    </select>
                    <input></input>
                    {" "} Match: {" "}
                    <input></input>
                </label>
                
                {/*
                    <label> {this.props.title}
                        <select onChange={this.dropDownChange}>
                            <option></option>
                            {this.props.choices.map((choice) => <option key={choice} > {choice} </option>)}
                        </select>
                    </label>*/}
            </div>
        )
    }
}

export default MatchDropdown;