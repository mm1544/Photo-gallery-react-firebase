//Importing Firebase from the package that was installed
import * as firebase from "firebase/app";
// To store images
import "firebase/storage";
// Firestore is a database
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAOngEk2Sbhl8XHQsGfmw2-Pmj9u3dHpzc",
  authDomain: "photo-gallery-fc372.firebaseapp.com",
  databaseURL: "https://photo-gallery-fc372.firebaseio.com",
  projectId: "photo-gallery-fc372",
  storageBucket: "photo-gallery-fc372.appspot.com",
  messagingSenderId: "243824092654",
  appId: "1:243824092654:web:260be89a73810799f85aff",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//To Initialize storage service and firestore service
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
// Firebase time-stamp. When need to create a firebase-time-stamp, need to invoke 'timeStamp'
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timeStamp };
