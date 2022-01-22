import React from 'react';

import classes from './BurgerButton.module.css';

const BurgerButton = (props) => {
	let burgerButtonClasses = classes.BurgerButton;
	if (props.mobileMenuShow) {
		burgerButtonClasses = burgerButtonClasses + ' ' + classes.BurgerButtonRotate;
	}

	return (
		<div className={ burgerButtonClasses } onClick={ ()=>{ props.handleMobileMenu( !props.mobileMenuShow ) } } >
			<div className={ classes.BurgerButtonBar }></div>
			<div className={ classes.BurgerButtonBar }></div>
			<div className={ classes.BurgerButtonBar }></div>
		</div>
	);
};

export default BurgerButton;
