import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export default function Product({ product, onAddProductToBuy, onUpdateProduct, onDeleteProduct }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurentProduct] = useState(product);
  const [editedProduct, setEditedProduct] = useState(product);
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();

  // Update product information whenever props changes
  useEffect(() => {
    setEditedProduct(product); // Reset editedProduct whenever product prop changes
    setCurentProduct(product);
    setIsEditing(false); // Ensure editing mode is disabled when product changes
  }, [product]);

  // Function to handle Add to Cart button
  const onAddToCart = () => {
    onAddProductToBuy(product);
  };

  // Function to handle starting in-card editing
  const handleEdit = () => {
    setIsEditing(true);
    setEditedProduct(product);
  };

  // Function to handle in-card editing cancel
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Function to handle in-card editing save
  const handleSaveEdit = () => {
    onUpdateProduct(editedProduct);
    setCurentProduct(editedProduct);
    setIsEditing(false);
  };

  // Function to handle product item deletion by pass product into parent function
  const handleDelete = () => {
    onDeleteProduct(product);
  };

  // Function to handle in-card editing state
  const handleChange = (e) => {
    e.preventDefault();

    setEditedProduct({
      id: product.id,
      name: nameRef.current.value,
      price: +priceRef.current.value,
      image: imageRef.current.value || "https://via.placeholder.com/150",
    })
  };

  // Learned from ChatGPT 3.5 with prompt: "How can I handle product information update in firebase
  // very easily like to edit product name and price in a product card with popup window or somethingelse?"
  return (
    <div className="col-4 mb-2">
      <div className="card">
        <div className="card-body">
          {isEditing ? (
            <div>
              <div className="mb-3">
                <label htmlFor="editProductName" className="form-label">Name:</label>
                <input type="text" id="editProductName" ref={nameRef} value={editedProduct.name} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="editProductPrice" className="form-label">Price:</label>
                <input type="number" id="editProductPrice" ref={priceRef} value={editedProduct.price} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="editProductImage" className="form-label">Image URL:</label>
                <input type="url" id="editProductImage" ref={imageRef} value={editedProduct.image} onChange={handleChange} className="form-control" />
              </div>
              <button className="btn btn-success" onClick={handleSaveEdit}>Save</button>
              <button className="btn btn-danger" onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <img src={currentProduct.image} className="card-img-top" style={{ width: "100%", height: "200px", objectFit: "cover" }} alt={currentProduct.name} />
              <h5 className="card-title">{currentProduct.name}</h5>
              <p className="card-text">${currentProduct.price}</p>
              <div className="btn-group">
                <button className="btn btn-primary" onClick={onAddToCart}>Add to Cart</button>
                <button className="btn btn-secondary" onClick={handleEdit}>Edit</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
  onAddProductToBuy: PropTypes.func.isRequired,
  onUpdateProduct: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
};
