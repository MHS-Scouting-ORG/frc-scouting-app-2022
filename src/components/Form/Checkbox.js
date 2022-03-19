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
        this.props.changeState(this.props.place,this.props.label);
    }

    render(){
        return(
            <div>
                <label> {this.props.label.substring(0,this.props.label.length - 1) + ": "}
                    < input type="checkbox" checked={this.props.checked} id={this.props.label} onChange={this.changeState} />
                </label>
            </div>
        )
    }
}

export default Checkbox;