import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import initializeAuthentication from '../../Firebase/firebase.init';

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const googleProvider = new GoogleAuthProvider();

    //sign in with google
    const auth = getAuth();
    const signInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const updateDisplayName = e => {
        updateProfile(auth.currentUser, { displayName: name })
            .then(() => { })
            .catch(error => setError(error.message));
    }

    const signUpNewUser = e => {
        e.preventDefault();
        password === confirmPassword ?
            createUserWithEmailAndPassword(auth, email, password)
                .then(result => {
                    setUser(result.user);
                    updateDisplayName();
                    setError('');
                })
                .catch(error => setError(error.message))
            :
            setError('Password not matched! Try again.');
    }

    const signInExistingUser = e => {
        return signInWithEmailAndPassword(auth, email, password);
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
        setError,
        signInUsingGoogle,
        updateDisplayName,
        signUpNewUser,
        signOutAccount,
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
        signInExistingUser
    }
}

export default useFirebase;