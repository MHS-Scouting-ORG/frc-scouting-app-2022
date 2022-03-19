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
        const input = document.getElementById(this.props.place);
        let value = parseInt(this.state.inputValue);
        if(value > 0){
            this.setState({inputValue:parseInt(this.state.inputValue) - 1})
            input.value = parseInt(this.state.inputValue) - 1;
        }
        else if(value <= 0){
            this.setState({inputValue:0})
            input.value = 0;
        }
    }

    buttonPlus(event){
        this.props.plusButton(event,this.props.place);
        const input = document.getElementById(this.props.place);
        let value = parseInt(this.state.inputValue);
        if(value >= 0){
            this.setState({inputValue:parseInt(this.state.inputValue) + 1})
            input.value = parseInt(this.state.inputValue) + 1;
        }
        else if(value < 0){
            this.setState({inputValue:0});
            input.value = 0;
        }
    }

    inputChange(event){
        if(event.target.value == ''){
            this.setState({inputValue:0});
        }
        else{
            this.setState({inputValue:event.target.value});
        }
        this.props.setState(event,this.props.place);
    }

    render(){
        return (
            <div>
                <label> {this.props.label}
                    <button value={this.props.state} onClick={this.buttonMinus}> - </button>
                    <input type='number' min={0} id={this.props.place} onChange={this.inputChange}></input>
                    <button value={this.props.state} onClick={this.buttonPlus}> + </button>
                </label>
            </div>
        );
    }
}

export default Input;