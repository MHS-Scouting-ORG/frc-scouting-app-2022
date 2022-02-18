import React from "react";

class Input extends React.Component{
    constructor(props){
        super(props);
        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(event){
        this.props.setState(event,this.props.place);
    }

    render(){
        return (
            <div>
                <label> {this.props.label}
                    <input type='number' onChange={this.inputChange}></input>
                </label>
            </div>
        );
    }
}

export default Input;