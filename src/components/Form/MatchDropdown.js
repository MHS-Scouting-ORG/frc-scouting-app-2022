import React from 'react';
import api from '../../api/index';

class MatchDropdown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            match: []
        }
        this.changeTeamNumber = this.changeTeamNumber.bind(this)

    }

    getMatches(url = '', data = {}){
        const matches = () => {
            fetch('https://www.thebluealliance.com/api/v3/event/2016nytr/matches',{
                mode: 'cors',
                headers:{
                    'X-TBA-Auth-Key': '47dyFWjomANFVkIVhafvIf2tFVzuvNsJ9iBOznH89PDotuFbEaSiSB6HpzBxlPZy'
                }
            })
            .then(response => response.json())
            .then(data => console.log(data),
            this.setState({match: data.results[0]}))
            .catch(err => console.log(err))
        }
        matches();
    }

    changeTeamNumber(event,){
        let matchType = event.target.value;
        if(matchType === "Qualification Match "){
            this.setState({matcheNumber:"qm"});
            return this.state.match.comp_level.qm;
        } 
        else if(matchType === "Quarterfinals Match "){
            this.setState({matcheNumber:"qf"});
            return this.state.match.comp_level.qf;
        }
        else if(matchType === "Semifinals Match "){
            this.setState({matcheNumber:"sf"});
            return this.state.match.comp_level.sf;
        }
        else if(matchType === "Finals Match "){
            this.setState({matcheNumber:"f"});
            return this.state.match.comp_level.f;
        }
    }

    render(){
        return (
            <div>
                <label>
                    <select onChange={this.changeTeamNumber}>
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