// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "neemble-eat.firebaseapp.com",
    projectId: "neemble-eat",
    storageBucket: "neemble-eat.appspot.com",
    messagingSenderId: "485828523035",
    appId: "1:485828523035:web:bfda40e25664748c44b4be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


export default auth