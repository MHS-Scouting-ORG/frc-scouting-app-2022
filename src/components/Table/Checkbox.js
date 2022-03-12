import React from 'react'

class Checkbox extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {checked: false}

    }

    handleChange(){
        this.setState({checked: !this.state.checked})

        this.props.changeState(!this.state.checked, this.props.value)
        
    }

    render(){
        return (
            <div>
                <label> {this.props.value + " "}
                    <input type='checkbox' onChange={this.handleChange} />
                </label>
            </div>
        )
    }
}

export default Checkbox;