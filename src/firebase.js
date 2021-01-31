import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD7OIcajXFHH_sjzesLDIaLdHldw-LTPmM",
    authDomain: "todo-app-dd56e.firebaseapp.com",
    projectId: "todo-app-dd56e",
    storageBucket: "todo-app-dd56e.appspot.com",
    messagingSenderId: "1030255859994",
    appId: "1:1030255859994:web:6557bc4ef924a9d18a34a3"
});

const db = firebaseApp.firestore();

export default db;