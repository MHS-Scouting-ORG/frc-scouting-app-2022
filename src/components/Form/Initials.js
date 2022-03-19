import React from "react";

function Initials(props){
    return (
        <div>
            <label> {"Scouter Initials: "}
                <input type="text" style={{textTransform:"uppercase"}} onChange={props.changeInitials}></input>
            </label>
        </div>
        )
}

export default Initials;