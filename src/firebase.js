import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyAGscYTGku-YbAwSG7-_caeWyCjag0XAOY",
    authDomain: "peer-review-25758.firebaseapp.com",
    databaseURL: "https://peer-review-25758.firebaseio.com",
    projectId: "peer-review-25758",
    storageBucket: "peer-review-25758.appspot.com",
    messagingSenderId: "389400582157"
};
firebase.initializeApp(config);

export default firebase;