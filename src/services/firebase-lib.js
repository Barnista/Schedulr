// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore, where } from "firebase/firestore";
import { query } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxSkzejEQ11l3J2P1xFJ3z7j4_5PnAF_U",
    authDomain: "schedulr-b5fcf.firebaseapp.com",
    projectId: "schedulr-b5fcf",
    storageBucket: "schedulr-b5fcf.firebasestorage.app",
    messagingSenderId: "193429954778",
    appId: "1:193429954778:web:46c67452898859486745e3",
    measurementId: "G-YHEJ9YPWKB"
};


export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAnalytics = getAnalytics(firebaseApp);

export const defaultAuth = {
    email: 'barnista@gmail.com',
    password: 'Barnista12345678'
}

export const db = getFirestore(firebaseApp);

export const refScheduleEvents = collection(db, 'schedule-events');

export const refPrograms = collection(db, 'programs');

export const getScheduleByDate = (startDate) => {
    return query(
        refScheduleEvents,
        where('start', '>=', startDate),
        where('start', '<=', startDate + '~')
    );
}