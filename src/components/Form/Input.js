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
                    <button> - </button>
                    <input type='number' min={0} onChange={this.inputChange}></input>
                    <button> + </button>
                </label>
            </div>
        );
    }
}

export default Input;