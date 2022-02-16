import React from "react";

function Input(props){
    return(
        <label> {props.title}
        <input type="number" onChange={props.change}></input>
        </label>
    )
}

export default Input;