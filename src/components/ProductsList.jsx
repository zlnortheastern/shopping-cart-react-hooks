import { useState } from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import Pagination from "./Pagination";


export default function ProductsList({ products, onAddProductToBuy }) {

  // Mostly Learned from https://www.youtube.com/watch?v=IYCa1F-OWmk
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Calculate the indexes of the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h2>Products</h2>
      <div className="products row">
        {currentProducts.map((product, index) => (
          <Product key={index} product={product} onAddProductToBuy={onAddProductToBuy} />
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
};