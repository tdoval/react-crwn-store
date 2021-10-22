import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: 'AIzaSyAfR1w3FOuGWlpCR-IZBBTGatsnHTuq6dE',
  authDomain: 'crwn-db-8105f.firebaseapp.com',
  projectId: 'crwn-db-8105f',
  storageBucket: 'crwn-db-8105f.appspot.com',
  messagingSenderId: '968029859351',
  appId: '1:968029859351:web:9d5dfc7d33ea4fa6c4f652',
  measurementId: 'G-E0X9K1XWSW',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('error creating user: ', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
