import React from 'react';

import classes from './MenuDrawer.module.css';
import { Link } from 'react-router-dom';

const MenuDrawer = (props) => {

	let drawerClasses = classes.MenuDrawer;
 	if (props.show) {
 		drawerClasses = drawerClasses + ' ' + classes.OpenDrawer;
 	}

	return (
		<div className={ drawerClasses } onClick={ ()=> {props.handleMobileMenu(false);console.log("Clicked drawer") } }>
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
			<Link to="/dashboard">Dashboard</Link>
			<Link to="/form">Form</Link>
		</div>
	);
};

export default MenuDrawer;
