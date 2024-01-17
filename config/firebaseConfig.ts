// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.FIREBASE_SECRET,
	authDomain: 'ecommerce-next-b23ce.firebaseapp.com',
	projectId: 'ecommerce-next-b23ce',
	storageBucket: 'ecommerce-next-b23ce.appspot.com',
	messagingSenderId: '345080813572',
	appId: '1:345080813572:web:51d27d77c414b56fd03d51',
	measurementId: 'G-RE21CKHM82',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

//
