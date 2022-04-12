// Inside our components we use either the setter or the getter from the state in UserProvider

import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// as the actual value we want to access | The context
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

// The Provider | Alias component
// Allows its children to get access to his state.
export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		// a permanently open listener, always waiting | needs to tell it to stop listening the component unmounts
		const unsubscribe = onAuthStateChangedListener(user => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
