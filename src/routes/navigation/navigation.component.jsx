import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import './navigation.styles.scss';
import { ReactComponent as DiamondLogo } from '../../assets/diamond.svg';

const Navigation = () => {
	return (
		<>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<DiamondLogo className="logo" />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/shop">
						SHOP
					</Link>
					<Link className="nav-link" to="/sign-in">
						SIGN IN
					</Link>
				</div>
			</div>
			{/* The Outlet renders everything inside the <Route></Route> */}
			<Outlet />
		</>
	);
};

export default Navigation;
