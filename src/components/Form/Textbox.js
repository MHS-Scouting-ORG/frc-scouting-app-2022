import React from "react";

function Textbox(props){
    return(
        <label> {props.title}
            <input type="text" onChange={props.commentState}></input>
        </label>
    )
}

export default Textbox;