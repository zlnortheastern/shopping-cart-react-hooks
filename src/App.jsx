import "./App.css";

import { useState, useEffect } from "react";

import ProductsList from "./components/ProductsList.jsx";
import CreateProductForm from "./components/CreateProductForm.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import { myFirebase } from "./models/MyFirebase.js";

export default function App() {
  const [products, setProducts] = useState([]);

  const [productsToBuy, setProductsToBuy] = useState([]);

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
  const onUpdateProduct = async (product) => {
    await myFirebase.updateProduct(product);
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
  };

  const onDeleteProduct = async (product) => {
    await myFirebase.deleteProduct(product.id);
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const onAddProductToBuy = (product) => {
    setProductsToBuy([...productsToBuy, product]);
  };

  const onRemoveCart = (index) => {
    setProductsToBuy(productsToBuy.filter((_, i) => i !== index));
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

