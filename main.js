import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
async function displayOrderData() {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
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


displayOrderData();
