import { useState } from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import Pagination from "./Pagination";


export default function ProductsList({ products, onAddProductToBuy, onUpdateProduct, onDeleteProduct }) {

  // Mostly Learned from https://www.youtube.com/watch?v=IYCa1F-OWmk
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // Calculate the indexes of the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Redirect page if there is no elements in current products
  if (currentProducts.length === 0 && currentPage !== 1) {
    setCurrentPage(currentPage - 1);
  }

  return (
    <>
      <h2>Products</h2>
      <div className="products row">
        {currentProducts.map((product, index) => (
          <Product
            key={index}
            product={product}
            onAddProductToBuy={onAddProductToBuy}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(products.length / productsPerPage)}
        onPageChange={onPageChange}
      />
    </>
  );
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddProductToBuy: PropTypes.func.isRequired,
  onUpdateProduct: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
};