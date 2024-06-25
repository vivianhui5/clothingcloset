import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDocs, collection } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCK4bwSrzCZC5nlWuwM6e_84DgCyPqI_Xs",
    authDomain: "clothing-closet-dd915.firebaseapp.com",
    projectId: "clothing-closet-dd915",
    storageBucket: "clothing-closet-dd915.appspot.com",
    messagingSenderId: "741917300158",
    appId: "1:741917300158:web:ebf138436720e47e7715ef",
    measurementId: "G-D292Z4EVLD"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, getDocs, collection };