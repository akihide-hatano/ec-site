// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection,getDocs, addDoc, QuerySnapshot, query } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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
const db = getFirestore(app);


//商品情報の取得
getDocs(collection(db,'items')
  .then((QuerySnapshot)=>{
    QuerySnapshot.forEach((doc) => {
      const itemData = doc.data();
      const itemId = doc.id;

  //商品情報を表示
  const itemElement = document.getElementById(itemId);
  const imgElement = itemElement.querySelector('img');
  const nameElement = itemElement.querySelector('.itemName');
  const priceElement =  itemElement.querySelector('itemPrice');


  imgElement.src = itemData.imageUrl;
  nameElement.textContent = itemData.name;
  priceElement.textContent = itemData.price;



    });
  }))

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener('click',
  async()=>{
    const name = document.querySelector('input[name="name"]');
    const telephone = document.querySelector('input[type="telephone"]');
    const gender = document.querySelector('input[name="gender"]:checked');

  
  //try,cathchにてfirebaseから取得する
  try{
    //注文情報をFirestoreに保存
  const customerRef = await addDoc(collection(db,"customers"),{
    name:name,
    telephone:telephone,
    gender:gender,
  });
  const customerId = customerRef.id;

  //注文情報をFirestoreに保存
  await addDoc(collection(db,"orders"),{
    customerId: customerId,
    orderDate:new Date(),
    items: [
      { name: 'ラーメン', quantity: ramenQuantity },
      { name: '玉子ラーメン', quantity: eggMenQuantity },
      { name: 'チャーシューメン', quantity: tyashuMenQuantity }
    ],
    totalPrice: calculateTotalPrice([
      { name: 'ラーメン', quantity: ramenQuantity, price: 600 },
      { name: '玉子ラーメン', quantity: eggMenQuantity, price: 800 },
      { name: 'チャーシューメン', quantity: tyashuMenQuantity, price: 800 }
    ])
  });
  console.log("注文情報を送信しました");
} catch (error) {
  console.error("注文情報の送信に失敗しました:", error);
}
});