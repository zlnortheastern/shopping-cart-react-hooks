import PropTypes from "prop-types";

export default function ShoppingCart({ productsToBuy, onRemoveProductToBuy  }) {
  const renderProductToBuy = (product, i) => {
    return (
      <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
        {product.name} - ${product.price}
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onRemoveProductToBuy(i)}
        >
          x
        </button>
      </li>
    );
  };

  return (
    <div>
      <ul className="list-group">
        {productsToBuy.map(renderProductToBuy)}
      </ul>
      <div className="mt-3">
        Total: ${productsToBuy.reduce((sum, product) => sum + product.price, 0).toFixed(2)}
      </div>
    </div>
  );
}

ShoppingCart.propTypes = {
  productsToBuy: PropTypes.array.isRequired,
  onRemoveProductToBuy : PropTypes.func.isRequired,
};