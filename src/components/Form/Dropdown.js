import React from 'react';

class Dropdown extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dropDownValue: ""
        }
    }

    optionChange(event){
        this.setState({dropDownValue: event.target.value})
    }

    render(){
        return(
           <div>
               <select>
                   {this.props.choice.map((choice) => <option key={choice} > {choice} </option>)}
               </select>
           </div>
        )
    }
}

export default Dropdown;