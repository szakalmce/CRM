// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD8QpF-0d8hn1gPJdpY50i-Wp1jL-AzbXY',
  authDomain: 'lekcja2022.firebaseapp.com',
  projectId: 'lekcja2022',
  storageBucket: 'lekcja2022.appspot.com',
  messagingSenderId: '217961583781',
  appId: '1:217961583781:web:e17da5a4e1c0176e44694c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
