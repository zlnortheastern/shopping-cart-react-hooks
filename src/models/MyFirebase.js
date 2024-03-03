// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore"
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
  const productRef = collection(db, "Product");

  // Firebase read operation
  r.getProducts = async () => {
    const querySnapshot = await getDocs(productRef);
    const products = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    return products;
  };

  // Firebase create operation
  r.addProduct = async (product) => {
    return await addDoc(productRef, product);
  };

  // Firebase update operation
  r.updateProduct = async (product) => {
    return await updateDoc(doc(db,"Product", product.id), {
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  // Firebase delete operation
  r.deleteProduct = async (id) =>{
    return await deleteDoc(doc(db,"Product", id));
  };

  return r;
}

export const myFirebase = new MyFirebase();