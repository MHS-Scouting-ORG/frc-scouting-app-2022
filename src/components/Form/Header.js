import React from "react";

function Header(props){
    return(
        <div>
            <h4> { "Ranking Points: " + props.display }</h4>
        </div>
    )
}

export default Header;