import React from 'react';

class Dropdown extends React.Component{
    constructor(props){
        super(props);
        this.dropDownChange = this.dropDownChange.bind(this);
    }

    dropDownChange(event){
        this.props.setState(event,this.props.place);
    }

    render(){
        return (
            <div>
                <label> {this.props.title}
                    <select onChange={this.dropDownChange}>
                        <option key={"empty"}></option>
                        {this.props.choices.map((choice) => <option key={choice} > {choice} </option>)}
                    </select>
                </label>
            </div>
        )
    }
}

export default Dropdown;