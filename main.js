// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection,getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArrhToaewnLbzt0sHhlXI5zbu7QSWcUiQ",
  authDomain: "ecsite-backend.firebaseapp.com",
  projectId: "ecsite-backend",
  storageBucket: "ecsite-backend.firebasestorage.app",
  messagingSenderId: "416670230076",
  appId: "1:416670230076:web:313146542ca4da70218539"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const submitButton = document.getElementById("submitButton");

submitButton.addEventListener('click',
  async()=>{
    const name = document.querySelector('input[name="name"]');
    const telephone = document.querySelector('input[type="telephone"]');
    const gender = document.querySelector('input[name="gender"]:checked');

  }
  //try,cathchにてfirebaseから取得する
  try{
    
  }
)