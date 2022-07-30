// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { TransactionProvider } from './context/TransactionContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TransactionProvider>

  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode> */}

  </TransactionProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB0_d9mMGwuXnjh9ctd38aJS7LucLyF_w8",
    authDomain: "ethbay-store.firebaseapp.com",
    projectId: "ethbay-store",
    storageBucket: "ethbay-store.appspot.com",
    messagingSenderId: "890143361082",
    appId: "1:890143361082:web:e6f7baaacd9a3950ed4d03",
    measurementId: "G-4CHGTTG18D"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  