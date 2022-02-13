import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Textbox from "./Textbox";

class Form extends React.Component{
    constructor(props){
        super(props);
        this.checkBoxClicked = this.checkBoxClicked.bind(this);
        this.makeCheckBox = this.makeCheckBox.bind(this);
        this.checkState = this.checkState.bind(this);
        this.state = {
            checkBoxValues:[false,false,false,false,false,false],
            Comment:"",
        };
    }

    checkBoxClicked(i){
        let boxChecked = this.state.checkBoxValues;
        boxChecked[i] = !boxChecked[i];
    }

    makeCheckBox(title,i){
        return(
            <div>
                <h3>{title}</h3>
                <Checkbox
                    changeState={this.checkBoxClicked}
                    place={i}
                />
            </div>
        )
    }

    checkState(){
        let checkBox = this.state.boxCheckValues[1];
        console.log(checkBox);
    }

    render(){
        return(
            <div>
                <h1>FORM</h1>
                {this.makeCheckBox("yellow card",0)}
                <button onClick={this.checkState}>CHECK STATE</button>
            </div>
        )
    }
}

export default Form;
