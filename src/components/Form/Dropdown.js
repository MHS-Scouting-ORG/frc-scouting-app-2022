import React from 'react';


class Dropdown extends React.Component{
    constructor(props){
        super(props);
        this.optionChange = this.optionChange.bind(this);
        this.state = {
            chosen:""
        }
    }

    optionChange(event){
        this.setState({chosen:event.target.value})
        console.log(event.target.value);
    }

    render(){
        return (
            <div>
                <select>
                    {this.props.choices.map((choice) => <option key={choice} > {choice} </option>)}
                </select>
            </div>
        )
    }
}

export default Dropdown;