import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import './navigation.styles.scss';
import { ReactComponent as DiamondLogo } from '../../assets/diamond.svg';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/card-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
	// Whenever the value in the useContext changes, re-render me.
	const { currentUser } = useContext(UserContext);

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
					{currentUser ? (
						<span className="nav-link" onClick={signOutUser}>
							SIGN OUT
						</span>
					) : (
						<Link className="nav-link" to="/auth">
							SIGN IN
						</Link>
					)}
					<CartIcon />
				</div>
				<CartDropdown />
			</div>
			{/* The Outlet renders everything inside the <Route></Route> */}
			<Outlet />
		</>
	);
};

export default Navigation;
