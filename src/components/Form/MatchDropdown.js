import { input } from 'aws-amplify';
import React from 'react';

class MatchDropdown extends React.Component{
    constructor(props){
        super(props);
        this.changeMatchType = this.changeMatchType.bind(this);   
    }

    changeMatchType(event){
        let matchType = event.target.value;
        if(matchType === "Qualification"){
            this.props.setMatchType('qm');
        } 
        else if(matchType === "Quarterfinal"){
            this.props.setMatchType('qf');
        }
        else if(matchType === "Semifinal"){
            this.props.setMatchType('sf');
        }
        else if(matchType === "Finals"){
            this.props.setMatchType('f');
        }
    }

    render(){
        return (
            <div>
                <label>
                    <select onChange={this.changeMatchType}>
                        <option></option>
                        <option> Qualification </option>
                        <option> Quarterfinal </option>
                        <option> Semifinal </option>
                        <option> Finals </option>
                    </select> {"  "}
                    <input onChange={this.props.setTypeNumber}></input>
                    {" "} Match: {" "}
                    <input onChange={this.props.setMatchNumber}></input>
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