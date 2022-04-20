import React from "react";

function Header(props){
    return(
        <div>
            <p style={{
                fontSize:'20px'
            }}> { "Ranking Points: " + props.display }</p>
        </div>
    )
}

export default Header;