import React from 'react';

import classes from './MenuDrawer.module.css';

const MenuDrawer = (props) => {
//	const show = useSelector(state => {
//		return state.mobileMenuShow;
//	});

	let drawerClasses = classes.MenuDrawer
// 	if (show) {
// 		drawerClasses = drawerClasses + ' ' + classes.OpenDrawer;
// 	}

	return (
		<div className={ drawerClasses }>
			<a href="#">Spirits</a>
			<a href="#">About</a>
			<a href="#">Sign In</a>
		</div>
	);
};

export default MenuDrawer;
