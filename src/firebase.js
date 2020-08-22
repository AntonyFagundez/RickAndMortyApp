import firebase from 'firebase/app';
require('firebase/firestore')
// import 'firebase/auth';
require('firebase/auth')

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyAVX1pXcVuQ9NaILxRDr5b6Tx9O0Pgp8P0",
    authDomain: "rick-y-morty-5668f.firebaseapp.com",
    databaseURL: "https://rick-y-morty-5668f.firebaseio.com",
    projectId: "rick-y-morty-5668f",
    storageBucket: "rick-y-morty-5668f.appspot.com",
    messagingSenderId: "218121338091",
    appId: "1:218121338091:web:399df9eabe8391a7cad2ae"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore().collection('favs');


export function updateDB(array, uid){
    return db.doc(uid).set({favorites : [...array]})
}

export function loginWithGoogle(){

    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(snapshot => snapshot.user)

}


export function logoutWithGoogle(){

    return firebase.auth().signOut();

}

export function getFavs(uid){
    return db.doc(uid).get()
        .then(snap =>{
            return snap.data().favorites;
        })
}