import "./App.css";

import { useState, useEffect } from "react";

import ProductsList from "./components/ProductsList.jsx";
import CreateProductForm from "./components/CreateProductForm.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import { myFirebase } from "./models/MyFirebase.js";

// Initialize the shopping cart from local storage or an empty array if it doesn't exist
const initialCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

export default function App() {
  // Hooks declaration
  const [products, setProducts] = useState([]);
  const [productsToBuy, setProductsToBuy] = useState(initialCart);

  // Get new product form value and store it into firebase
  const onAddProduct = async (product) => {
    const ref = await myFirebase.addProduct(product);
    setProducts([
      ...products,
      {
        id: ref.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
    ]);
  };

  // Update the product information from product card editing form
  const onUpdateProduct = async (product) => {
    await myFirebase.updateProduct(product);
    setProducts(products.map((p) => (p.id === product.id ? product : p)));

    setProductsToBuy(productsToBuy.map((p) => (p.id === product.id ? { ...product } : p)));
    storeCartDataLocally(productsToBuy.map((p) => (p.id === product.id ? { ...product } : p)));       
  };

  // Perform deletion of product
  const onDeleteProduct = async (product) => {
    await myFirebase.deleteProduct(product.id);
    setProducts(products.filter((p) => p.id !== product.id));

     // Remove product from the shopping cart if it exists
     setProductsToBuy(productsToBuy.filter((p) => p.id !== product.id));

     // Update local storage
     localStorage.setItem("shoppingCart", JSON.stringify(productsToBuy.filter((p) => p.id !== product.id)));
  };

  // Shopping cart item insertion
  const onAddProductToBuy = (product) => {
    setProductsToBuy([...productsToBuy, product]);
    storeCartDataLocally([...productsToBuy, product]);
  };

  // Shopping cart item deletion
  const onRemoveCart = (index) => {
    setProductsToBuy(productsToBuy.filter((_, i) => i !== index));
    storeCartDataLocally(productsToBuy.filter((_, i) => i !== index));
  }

  const storeCartDataLocally = (cart) =>{
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }
  
  // Load data when component is mounted
  useEffect(() => {
    const getProducts = async () => {
      const products = await myFirebase.getProducts();
      setProducts(products);
    }
    
    getProducts();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <h1>Basic Shopping Site</h1>

          <ProductsList products={products}
            onAddProductToBuy={onAddProductToBuy}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct} />
          <CreateProductForm onAddProduct={onAddProduct} />
        </div>
        {/* col-8 */}

        <div className="col-4">
          <h2>Shopping Cart</h2>
          <ShoppingCart productsToBuy={productsToBuy} onRemoveProductToBuy={onRemoveCart} />
        </div>
      </div>
    </div>
  );
}

