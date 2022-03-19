import React from 'react';

function Scale(props){
    return (
        <div>
            {props.values.map((num) => 
                <label key={num}> {" " + num + " "}
                    <input 
                    type="radio"
                    name={"scale"}
                    value={num}
                    onChange={props.changeScale}>
                    </input>
                </label>
            )}
        </div>
    )
}

export default Scale;