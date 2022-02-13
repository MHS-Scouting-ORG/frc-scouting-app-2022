import React from "react";

class Checkbox extends React.Component{
    constructor(props){
        super(props);
        this.changeState = this.changeState.bind(this);
        this.state = {
            checked:false
        }
    }
    
    changeState(){
        this.props.changeState(this.props.place)
        console.log(this.props.place);
    }

    render(){
        return(
            <input type="checkbox" onChange={this.changeState}></input>
        )
    }
}

export default Checkbox;