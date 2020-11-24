// import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/database";

import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyB6k4rx6NMVDy9ROwPNBTpytjAdDDHFb0A",
    authDomain: "todo-app-5.firebaseapp.com",
    databaseURL: "https://todo-app-5.firebaseio.com",
    projectId: "todo-app-5",
    storageBucket: "todo-app-5.appspot.com",
    messagingSenderId: "661179260168",
    appId: "1:661179260168:web:dbb6d9d34c81784d48e0bd",
    measurementId: "G-0VPVYGR6GC"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
export const provider = new firebase.auth.FacebookAuthProvider();