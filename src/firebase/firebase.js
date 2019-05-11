import firebase from 'firebase/app';
import 'firebase/firebase-database';
import 'firebase/firebase-firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

const app = firebase.initializeApp(config);

const database = app.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// const attributes = {
//   height: 168,
//   weight: 150
// };

// database.ref().set({
//   name: 'Sanjay Sachdev',
//   age: 26,
//   isSingle: true,
//   location: {
//     city: 'Houston',
//     zip: 77030,
//     country: 'USA'
//   }
// }).then(() => {
//   console.log('Data saved to Realtime Database');
// }).catch((e) => {
//   console.log('This failed ', e);
// });

// database.ref('age').set(27);
// database.ref('location/zip').set(77033);
// database.ref('attributes')
//         .set(attributes)
//         .then(() => console.log('Element attribute added successfully'))
//         .catch((e) => console.log('Could not update element attrubute. It threw following error', 2));

// database.ref('isSingle')
//         .remove()
//         .then(() => console.log('Successfully removed the isSingle status'))
//         .catch((e) => console.log('Something went wrong while removing the isSingle status', e))

// database.ref().update({
//   name: 'Mike',
//   age: 28,
//   job: 'Software Engineer',
//   isSingle: null,
//   'location/city': 'Seattle'
// });

// database.ref('location/city')
//   .once('value')
//   .then((snapshot) => {
//     console.log("Data from firebase realtime database ", snapshot.val());
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// database.ref().on('value', snapshot => {
//   console.log("Reatime updates from firebase realtime database ", snapshot.val());
// });

// database.ref().on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(`${data.name} is a ${data.job} at ${data.company}`);
// })

// setTimeout(() => {
//   database.ref('name').set('Mike');
// }, 5000);

const db = app.firestore();

const expensesFs = (uid) => db.collection("users").doc(uid).collection("expenses");

export { firebase, googleAuthProvider, expensesFs, db, database as default };

// let sanjayDocRef;
// sanjayDocRef.set(
//   {
//     name: "Sanjay Prakash Sachdev",
//     email: "sanjay.sachdev@hotmail.com",
//     age: 26,
//     isSingle: true,
//     location: {
//       city: 'Houston',
//       zip: 77030,
//       country: 'USA'
//     }
//   }
// ).then(() => {
//   console.log('Data is saved');
// }).catch((e) => {
//   console.log('This failed ', e);
// });

// db.collection("employees").doc("sanjay").update({
//   "age": 13,
//   "location.zip": 77033
// })
// .then(() => {
//   console.log("Document successfully updated!");
// }).catch((e) => {
//   console.log('This failed ', e);
// });

// db.collection("employees").doc("sanjay").update({
//   "attributes": attributes
// })
// .then(() => {
//   console.log("Document successfully updated 2!");
// }).catch((e) => {
//   console.log('This failed ', e);
// });

// db.collection("employees").doc("sanjay").update({
//   "age": firebase.firestore.FieldValue.delete()
// })
// .then(() => {
//   console.log('Successfully removed the age data !');
// }).catch((e) => {
//   console.log('Something went wrong while removing the age data', e)
// });

// sanjayDocRef.get()
//   .then((doc) => {
//     if (doc.exists) {
//       console.log("Document data from firestore ", doc.data());
//     }
//   })
//   .catch((e) => {
//     console.log(e);
//   });
  
// var unsubscribe = sanjayDocRef.onSnapshot((doc) => {
//   const data = doc.data()
//   console.log(`Firestore : ${data.name} is a ${data.job} at ${data.company}`);
// });

// setTimeout(() => {
// //  unsubscribe();
//   db.collection("employees").doc("sanjay").update({
//     "company": "Google"
//   })
//   .then(() => {
//     console.log("Document successfully updated!");
//   }).catch((e) => {
//     console.log('This failed ', e);
//   });
// }, 10000);

// console.log('I made a request to save the data');
// const userRef = db.collection("employees").add({
//   name: "Sanjay Prakash Sachdev",
//   email: "sanjay.sachdev@hotmail.com",
//   age: 26,
//   isSingle: true,
//   location: {
//     city: 'Houston',
//     zip: 77030,
//     country: 'USA'
//   }
// });