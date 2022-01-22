import React from 'react';

import classes from './BurgerButton.module.css';

const BurgerButton = (props) => {
//	const dispatch = useDispatch();
//
//	const showMobileMenu = () => {
//		dispatch({type: 'show'});
//	};
//
//	const showMenu = useSelector(state => {
//		return state.mobileMenuShow;
//	});
//
	let burgerButtonClasses = classes.BurgerButton;
//	if (showMenu) {
//		burgerButtonClasses = burgerButtonClasses + ' ' + classes.BurgerButtonRotate;
//	}

	return (
		<div className={ burgerButtonClasses } >
			<div className={ classes.BurgerButtonBar }></div>
			<div className={ classes.BurgerButtonBar }></div>
			<div className={ classes.BurgerButtonBar }></div>
		</div>
	);
};

export default BurgerButton;
