import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initializeAuthentication = () => {
    initializeApp(firebaseConfig);
}

export default initializeAuthentication;


/*
steps for authentication
------------------------
Step i. Initial Setup
1. Create a project on Firebase
2. Create a Web App
3. Get Configuration
4. Initialize Firebase
5. Enable auth method(s)[google, email, fb, github etc.]
--------------------
Step ii. Form setup
1. Create Login Component
2. Create Register Component
3. Create route for signin and signup
--------------------
Step iii. Sign in setup
1. set up sign in method
2. set up sign out method
3. user state
4. special observer
5. return necessary mathods and states from firebase
---------------------
Step iv. Context
1. Create an auth context
2. Create a context provider
3. Set context value after .provider
4. Setup useAuth provider
5. Create use auth hook
---------------------
Step v. Private Route
1. Create Private Route
2. Setup Private Route
---------------------
Step vi. Redirect after login
1. After login user redirect to their desired destination
*/