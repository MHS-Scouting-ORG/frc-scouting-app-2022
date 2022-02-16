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
            <label> {this.props.title}
                <input type="text" onChange={this.textStateChange}></input>
            </label>
        )
    };
}

export default Textbox;