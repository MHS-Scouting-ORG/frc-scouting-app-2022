import React from 'react';

import { Link } from 'react-router-dom';

import BurgerButton from './BurgerButton/BurgerButton';
import classes from './Header.module.css';

const header = (props) => {
	return (
		<div className={ classes.Header }>
			<BurgerButton handleMobileMenu={ props.handleMobileMenu } mobileMenuShow={ props.mobileMenuShow } />
			<div className={ classes.Nav }>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
				<Link to="/dashboard">Dashboard</Link>
				<Link to="/form">Form</Link>
			</div>
		</div>
	);
};

export default header;
