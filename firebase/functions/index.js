var firebase = require('firebase');
var functions = require('firebase-functions');
var config = {
  apiKey: "AIzaSyBzy4ctl-AgyeZSu2Mu9AUuVSHiZh0-TSg",
  authDomain: "react-native-7f0db.firebaseapp.com",
  databaseURL: "https://react-native-7f0db.firebaseio.com",
  projectId: "react-native-7f0db",
  storageBucket: "react-native-7f0db.appspot.com",
  messagingSenderId: "832639299928"
};
firebase.initializeApp(config);
const csv=require('csvtojson');
const request=require('request');

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })
exports.CSV = functions.database.ref('/CSVFile/{uuid}').onWrite(event=>{
  var theid = event.params.uuid;
  firebase.database().ref().child('CSVFile').child(theid).once('value').then(function(snapshot) {
      var csvurl = snapshot.val().CsvURL;
      csv()
      .fromStream(request.get(csvurl))
      .on('json',(jsonObj)=>{



           var studentRef = firebase.database().ref().child('studentpage').child('students');
           studentRef.push({
              jsonObj
           });


      })
      .on('done',(error)=>{
           console.log(error);
      })

  });
  return null;

});
