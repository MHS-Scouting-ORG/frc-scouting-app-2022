import React from "react";

function Initials(props){
    return ( <input style={{textTransform:"uppercase"}} onChange={props.changeInitials}></input>)
}

export default Initials;