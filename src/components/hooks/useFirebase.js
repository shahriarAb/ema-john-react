import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import initializeAuthentication from '../../Firebase/firebase.init';

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const googleProvider = new GoogleAuthProvider();

    //sign in with google
    const auth = getAuth();
    const signInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    //sign out
    const signOutAccount = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .catch(error => setError(error.message));
    }

    //set observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });
        return unsubscribe;
    }, []);

    return {
        user,
        error,
        signInUsingGoogle,
        signOutAccount
    }
}

export default useFirebase;