const csv = require('csv-parser');
const fs = require('fs');

var firebaseConfig = {
  apiKey: "AIzaSyB-tp-3Er9ssfs3ZMrP3UscWuRSUYgNq0o",
  authDomain: "lamap-303708.firebaseapp.com",
  databaseURL: "https://lamap-303708-default-rtdb.firebaseio.com",
  projectId: "lamap-303708",
  storageBucket: "lamap-303708.appspot.com",
  messagingSenderId: "657617536742",
  appId: "1:657617536742:web:00f2a6468463a62827dd27",
  measurementId: "G-LZR0F8L1F4"
};

// Initialize Firebase
const firebase = require("firebase");
require("firebase/firestore");
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

//load data and upload to firebase firestore
function load(filename, name) {
  fs.createReadStream(filename)
    .pipe(csv())
    .on('data', (row) => {
      // console.log(row);
      //set data on firestore
      db.collection(name).doc().set({
        Store: row['門市'],
        Address: row['地址'],
        GeoLocation: new firebase.firestore.GeoPoint(parseFloat(row['緯度']),parseFloat(row['經度']))
      })
      .then(() => {
          // console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

load('data/ETtoday.csv', 'ETtoday');
load('data/Fish.csv','Fish');
load('data/PetPark.csv','PetPark');