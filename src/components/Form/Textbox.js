import React from "react";

function Textbox(props){
    return (
        <div>
            <p>{props.title}</p>
            <textarea onChange={props.commentState} rows="4" cols="50"
                style={{
                wordWrap: 'normal', 
                }}
            />
        </div>
    )
}

export default Textbox;