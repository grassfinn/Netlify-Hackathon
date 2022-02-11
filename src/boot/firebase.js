// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDgFElVb0aLoS6TQP_dZFGxK1tzBwe6UCg',
	authDomain: 'for-the-birds-32fd3.firebaseapp.com',
	projectId: 'for-the-birds-32fd3',
	storageBucket: 'for-the-birds-32fd3.appspot.com',
	messagingSenderId: '684023981401',
	appId: '1:684023981401:web:2cf0a316264368d3a8d848',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db
