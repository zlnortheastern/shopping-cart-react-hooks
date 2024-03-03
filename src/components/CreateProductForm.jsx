import { useRef } from 'react';
import PropTypes from "prop-types";

export default function CreateProductForm({ onAddProduct }) {
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const onAddProductHelper = (e) => {
    e.preventDefault();

    onAddProduct({
      name: nameRef.current.value,
      price: +priceRef.current.value,
      image: imageRef.current.value || "https://via.placeholder.com/150"
    })
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form>
        <div>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" ref={nameRef}/>
        </div>

        <div>
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input type="number" className="form-control" id="price" ref={priceRef}/>
        </div>

        <div>
          <label htmlFor="image" className="form-label">
            Image(URL)
          </label>
          <input type="url" className="form-control" id="image" ref={imageRef}/>
        </div>

        <button className="btn btn-primary" onClick={onAddProductHelper}>
          Add Product
        </button>

      </form>
    </div>
  )
}
CreateProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
}