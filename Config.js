import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAS-fGNZ4vcLRGs3cCJceZG1UU45B_yemw",
  authDomain: "barterapp-84b97.firebaseapp.com",
  projectId: "barterapp-84b97",
  storageBucket: "barterapp-84b97.appspot.com",
  messagingSenderId: "126034304071",
  appId: "1:126034304071:web:36a8f2eaac98b3280ee562"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
