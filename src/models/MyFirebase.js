// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function MyFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyDUvPh7PJr7pP_4bVsUolaIBGqgrNoZmrE",
    authDomain: "shopping-cart-react-hooks.firebaseapp.com",
    projectId: "shopping-cart-react-hooks",
    storageBucket: "shopping-cart-react-hooks.appspot.com",
    messagingSenderId: "664114321504",
    appId: "1:664114321504:web:8ef2dcede4092d37d74b05"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const r = {};

  r.getProducts = async () => {
    const productRef = collection(db, "Product");

    return (await getDocs(productRef)).docs.map((doc) => doc.data());
  };

  return r;
}

export const myFirebase = new MyFirebase();