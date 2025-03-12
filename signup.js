import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword, GoogleAuthProvider,signInWithPopup,onAuthStateChanged } from "firebase/auth";

// Firebase 設定
const firebaseConfig = {
    apiKey: "AIzaSyArrhToaewnLbzt0sHhlXI5zbu7QSWcUiQ",
    authDomain: "ecsite-backend.firebaseapp.com",
    projectId: "ecsite-backend",
    storageBucket: "ecsite-backend.firebasestorage.app",
    messagingSenderId: "416670230076",
    appId: "1:416670230076:web:313146542ca4da70218539",
  };

// Firebase 初期化
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const signupForm = document.getElementById("signup-form");

console.log(signupForm);

signupForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const signupResult = document.getElementById("signupResult");
    const name = signupForm.name.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredenital)=>{
        const user = userCredenital.user;
        signupResult.textContent = "登録完了"
    }).catch((error)=>{
        const errrorCode = error.code;
        const errorMessage = error.message;
        signupResult.textContent = "登録失敗: " + errrorCode + " " + errorMessage; // 修正
    });

});

//googleでloginする
const googleLoginButton = document.getElementById("google-login-button");
googleLoginButton.addEventListener("click",(event)=>{
    const auth = getAuth();
    const provider = new GoogleAuthProvider()
    const signupResult = document.getElementById("signupResult");
    signInWithPopup(auth,provider)
    .then((result)=>{
        // Googleログイン成功
        const user = result.user;
        signupResult.textContent = "Googleログイン成功";
    })
    .catch((error)=>{
        signupResult.textContent = "Googleログイン失敗";
    });
});

onAuthStateChanged(auth,(user)=>{
    if(user){
        window.location.href = "apper.html";
    } else{
         // ログアウト状態
    const container = document.getElementById("container");
    container.innerHTML = `
      <h1>ログインしてください</h1>
      <button id="login-button">ログイン</button>
    `;
    }
});