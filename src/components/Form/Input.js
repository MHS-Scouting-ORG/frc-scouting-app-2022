import React from "react";

class Input extends React.Component{
    constructor(props){
        super(props);
        this.inputChange = this.inputChange.bind(this);
        /*this.buttonMinus = this.buttonMinus.bind(this);
        this.buttonPlus = this.buttonPlus.bind(this);
    }

    buttonMinus(event){
        this.props.minusButton(event,this.props.place);
        const input = document.getElementById(this.props.state);
        input.value = (parseInt(event.target.value) - 1);
    }

    buttonPlus(event){
        this.props.plusButton(event,this.props.place);
        const input = document.getElementById(this.props.state);
        input.value = (parseInt(event.target.value) + 1);
    }*/
    }

    inputChange(event){
        this.props.setState(event,this.props.place);
    }

    render(){
        return (
            <div>
                <label> {this.props.label}
                    {/*<button value={this.props.state} onClick={this.buttonMinus}> - </button>*/}
                    <input type='number' min={0} id={this.props.state} onChange={this.inputChange}></input>
                    {/*<button value={this.props.state} onClick={this.buttonPlus}> + </button>
                    <button onClick={this.props.statesCheck}>TEST</button>*/}
                </label>
            </div>
        );
    }
}

export default Input;