// Creates an instance of the app based on some type of config
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Our web app's firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCZRahwLN0kQsNPjHfj7-Pc0Iz-PnCgXsw',
	authDomain: 'clothing-store-db-be33f.firebaseapp.com',
	projectId: 'clothing-store-db-be33f',
	storageBucket: 'clothing-store-db-be33f.appspot.com',
	messagingSenderId: '635034068087',
	appId: '1:635034068087:web:46b37e044ae1c91f671272',
	measurementId: 'G-TKK1TSR4N8',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// The providers are instructions for these instances of providers.
const provider = new GoogleAuthProvider();
// When someone interacts with the provider we want them to select an account.
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Now we can firestore what data we want to get or set.
export const db = getFirestore();

export const createUserDocumentFromAuth = async userAuth => {
	const userDocRef = doc(db, 'users', userAuth.uid);

	// We can see if the instance exists and we can access the data.
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.error('Error creating the user', error.message);
		}
	}

	return userDocRef;
};
