import React from 'react';

function Dropdown(props){
    return (
        <div>
            <label> {props.title}
                <select onChange={props.setState}>
                    <option></option>
                    {props.choices.map((choice) => <option key={choice} > {choice} </option>)}
                </select>
            </label>
        </div>
    )
}

export default Dropdown;