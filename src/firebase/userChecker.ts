import {useEffect} from 'react';
import {auth} from './firebase';
import {onAuthStateChanged} from "firebase/auth";

function UseCheckUser() {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                console.log("User is logged in:", user);
            } else {
                console.log("No user logged in.");
            }
        });

        return () => unsubscribe();
    }, []);
}

export default UseCheckUser;