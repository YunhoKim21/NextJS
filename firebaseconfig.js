// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBrWIhZzsq1e24o1IDm83B3iAXnf_AiYN0',
  authDomain: 'blog-34975.firebaseapp.com',
  projectId: 'blog-34975',
  storageBucket: 'blog-34975.appspot.com',
  messagingSenderId: '375534153186',
  appId: '1:375534153186:web:c5c1a8c5dc158bfeb15dbb',
  measurementId: 'G-33F28CEQKM',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
