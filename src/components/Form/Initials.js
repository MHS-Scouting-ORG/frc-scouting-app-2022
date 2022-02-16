import React from "react";

function Initials(props){
    return( 
        <label> 
            {props.title}
            <input style={{textTransform: "uppercase"}} onChange={props.chnageInitials}></input>
        </label>
    )
}

export default Initials;