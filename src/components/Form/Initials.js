import React from "react";

function Initials(props){
    return (
        <label> {"Scouter Initials: "}
            <input type="text" style={{textTransform:"uppercase"}} onChange={props.changeInitials}></input>
        </label>
        )
}

export default Initials;