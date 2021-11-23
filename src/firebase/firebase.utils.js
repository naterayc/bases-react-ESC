import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; //functions
import 'firebase/compat/auth'; //autentication

//config
const config = {
  apiKey: "AIzaSyD_Z72V5raLECBIk1PDC8ze5ZASUMmyZgY",
  authDomain: "bases-react-yc.firebaseapp.com",
  projectId: "bases-react-yc",
  storageBucket: "bases-react-yc.appspot.com",
  messagingSenderId: "25173698632",
  appId: "1:25173698632:web:4aa35f2bb7eb507776907d"
};

// Initialize Firebase
firebase.initializeApp(config);

// function for create-documents
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

// exports
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//providers
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;