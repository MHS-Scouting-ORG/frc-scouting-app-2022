import React from "react";

class Input extends React.Component{
    constructor(props){
        super(props);
        this.inputChange = this.inputChange.bind(this);
        this.buttonMinus = this.buttonMinus.bind(this);
        this.buttonPlus = this.buttonPlus.bind(this);
        this.state = {
            inputValue:0
        }
    }

    buttonMinus(event){
        this.props.minusButton(event,this.props.place);
        const input = document.getElementById(this.props.state);
        this.setState({inputValue:parseInt(this.state.inputValue) - 1})
        input.value = parseInt(this.state.inputValue) - 1;
    }

    buttonPlus(event){
        this.props.plusButton(event,this.props.place);
        const input = document.getElementById(this.props.state);
        this.setState({inputValue:parseInt(this.state.inputValue) + 1})
        input.value = parseInt(this.state.inputValue) + 1;
    }

    inputChange(event){
        this.props.setState(event,this.props.place);
        this.setState({inputValue:event.target.value})
    }

    render(){
        return (
            <div>
                <label> {this.props.label}
                    <button value={this.props.state} onClick={this.buttonMinus}> - </button>
                    <input type='number' min={0} id={this.props.state} onChange={this.inputChange}></input>
                    <button value={this.props.state} onClick={this.buttonPlus}> + </button>
                </label>
            </div>
        );
    }
}

export default Input;