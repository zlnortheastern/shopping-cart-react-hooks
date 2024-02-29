import PropTypes from "prop-types";

export default function ShoppingCart({ productsToBuy }) {

  const renderProductToBuy = (product, i) => <li key={i}>{product.name} ${product.price}</li>
  return (
    <div>
      <ul>
        {productsToBuy.map(renderProductToBuy)}
      </ul>
      Total: {productsToBuy.reduce((sum, product) => sum + product.price, 0)}
    </div>
  );
}

ShoppingCart.propTypes = {
  productsToBuy: PropTypes.array.isRequired,
};