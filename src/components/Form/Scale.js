import React from 'react';

import classes from './Scale.module.css';

function Scale(props){
    return (
        <div className={classes.Div}>
            {props.values.map((num) => 
				<div className={classes.InnerDiv}>
                   <label className={classes.Label} key={num}>{num}</label>
                   <input 
   					  className={classes.Input}
                      type="radio"
                      name={"scale"}
                      value={num}
                      onChange={props.changeScale}>
                   </input>
				    </div>
            )}
        </div>
    )
}

export default Scale;
