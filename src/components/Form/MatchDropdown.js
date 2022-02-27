import React from 'react';

class MatchDropdown extends React.Component{
    constructor(props){
        super(props);
        this.changeMatchType = this.changeMatchType.bind(this);
        this.makeMatchTypeNumberDropdown = this.makeMatchTypeNumberDropdown.bind(this);
        this.state = {
            matchType:'',
        }
    }

    /*displayNumberInput(){
        this.setState({displayMatch: !this.state.displayMatch})
    }*/

    changeMatchType(event){
        let matchType = event.target.value;
        if(matchType === "Qualification"){
            this.props.setMatchType('q');
            this.setState({matchType:'q'})
        } 
        else if(matchType === "Quarterfinal"){
            this.props.setMatchType('qf');
            this.setState({matchType:'qf'})
        }
        else if(matchType === "Semifinal"){
            this.props.setMatchType('sf');
            this.setState({matchType:'sf'})
        }
        else if(matchType === "Finals"){
            this.props.setMatchType('f');
            this.setState({matchType:'f'})
        }
    }

    makeMatchTypeNumberDropdown(){ 
        return (
            this.props.makeNumberDropdown(this.state.matchType)
        )
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
                    {this.makeMatchTypeNumberDropdown()}
                    {" "} Match: {" "}
                    <input onChange={this.props.setMatchNumber}></input>
                </label>
            </div>
        )
    }
}

export default MatchDropdown;