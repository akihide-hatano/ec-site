//import宣言
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs,addDoc,query,orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

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
const db = getFirestore(app);
const storage = getStorage(app); // storage 変数を初期化


// const imagePaths = [
//   "https://firebasestorage.googleapis.com/v0/b/ecsite-backend.firebasestorage.app/o/item1.png?alt=media&token=e33f33af-81c7-4f76-9ed5-d7544f6cfab2",
//   "https://firebasestorage.googleapis.com/v0/b/ecsite-backend.firebasestorage.app/o/item2.png?alt=media&token=1570ab92-2fb6-4571-b5b1-6051021344ce", // item2.png の URL
//   "https://firebasestorage.googleapis.com/v0/b/ecsite-backend.firebasestorage.app/o/item3.png?alt=media&token=388fbb6b-5511-4f2f-bc68-99bf9655432f"  // item3.png の URL
// ];

// //画像のURLの配列をループ処理

// const imageElements = document.querySelectorAll(".itemImage");


// imagePaths.forEach((url,index) =>{
//   const imageRef = ref(storage,url);

// getDownloadURL(imageRef).then((url) => {
//   imageElements[index].src = url; // 取得した URL を img 要素の src 属性に設定
// })
// .catch((error) => {
//   console.error("画像の取得に失敗しました:", error); // 具体的なエラーメッセージを出力
//   imageElements[index].src = "path/to/placeholder-image.png"; // 代替画像を表示
//   // エラーログを記録 (例: Firebase Analytics を使用)
//   // analytics.logEvent("image_load_error", {
//   //   error: error.message,
//   //   url: url,
//   // });
// });
// });

//商品登録フォームにて登録
const form = document.getElementById("product-form");
if (form) { // フォームが存在する場合のみ処理を実行
//非同期処理にて対応
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

//フォームの値を取得
    const name = form.name.value;
    const price = form.price.value;
    const image = form.image.files[0];

//画像のアップロード
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);

//addDocメソッドにてデータを追加
    try {
      await addDoc(collection(db, "orders"), {
        name: name,
        price: parseInt(price),
        imageUrls: imageUrl,
      });
      message.textContent = "商品の登録に成功しました。";
      displayOrderData(); // 商品表示関数を呼び出す
    } catch (error) {
      console.error("商品の登録に失敗しました:", error);
      message.textContent = "商品の登録に失敗しました。";
    }
  });
}

//商品表示(index.html)について
async function displayOrderData(orderByField, orderByDirection) {
  try {
    const q = query(
      collection(db,"orders"),
      orderBy(orderByField,orderByDirection), // 価格で昇順にソート
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const itemContainer = document.querySelector("#item-zone"); // 商品を表示するコンテナ要素
      itemContainer.innerHTML = ""; // コンテナをクリア

      querySnapshot.docs.forEach((doc) => {
        const orderData = doc.data();

        // 新しい要素を作成
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        const itemNameElement = document.createElement("h2");
        itemNameElement.classList.add("itemName");
        itemNameElement.textContent = orderData.name;

        const itemPriceElement = document.createElement("span");
        itemPriceElement.classList.add("itemPrice");
        itemPriceElement.textContent = "¥" + orderData.price;

        const imageContainer = document.createElement("div"); // 画像用のコンテナ
        imageContainer.classList.add("image-container");

        if (Array.isArray(orderData.imageUrls)) {
          orderData.imageUrls.forEach((imageUrl) => {
            const img = document.createElement("img");
            img.src = imageUrl;
            img.classList.add("itemImage");
            imageContainer.appendChild(img);
          });
        } else {
          const img = document.createElement("img");
          img.src = orderData.imageUrls;
          img.classList.add("itemImage");
          imageContainer.appendChild(img);
        }

        // 要素をコンテナに追加
        itemDiv.appendChild(itemNameElement);
        itemDiv.appendChild(imageContainer);
        itemContainer.appendChild(itemDiv);
        itemDiv.appendChild(itemPriceElement);
      });
    } else {
      console.log("注文データが見つかりませんでした");
    }
  } catch (error) {
    console.error("注文データの取得に失敗しました", error);
  }
}

displayOrderData("price", "desc"); // 初期表示時のソート順を指定

const priceAscButton = document.getElementById("price-asc");
const priceDescButton = document.getElementById("price-desc");
const dateDescButton = document.getElementById("date-desc");


priceAscButton.addEventListener("click", (event) => {
  event.preventDefault(); // デフォルトのイベント処理を防止
  console.log("priceAscButton clicked");
  console.log("orderByField:", "price");
  console.log("orderByDirection:", "asc");
  displayOrderData("price", "asc");

});

priceDescButton.addEventListener("click", (event) => {
  event.preventDefault();
  displayOrderData("price", "desc");
});

dateDescButton.addEventListener("click", (event) => {
  event.preventDefault();
  displayOrderData("name", "desc");
});

// //Login機能
// const auth = getAuth();
// const loginForm = document.getElementById("login-form");
// const emailLoginButton = document.getElementById("login-formButton");
// const googleLoginButton = document.getElementById("google-loginButton");

// loginForm.addEventListener("submit",(event)=>{
//   event.preventDefault();
//   const email = loginForm.email.value;
//   const password = loginForm.password.value;

//   signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // 登録成功
//     const user = userCredential.user;
//     console.log("登録成功:", user);
//     // 登録後の処理
//   })
//   .catch((error) => {
//     // 登録失敗
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.error("登録失敗:", errorCode, errorMessage);
//     // エラーメッセージを表示


//     });  
// });
