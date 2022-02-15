import React from "react";

class Textbox extends React.Component{
    constructor(props){
        super(props);
        this.textStateChange = this.textStateChange.bind(this);
        this.state = {
            text:""
        }
    }

    textStateChange(event){
        this.setState({text:event.target.value});
    }

    render(){
        return(
            <input type="text" onChange={this.textStateChange}></input>
        )
    };
}

export default Textbox;