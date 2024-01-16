import React from "react";


import { useDispatch, useSelector } from "react-redux";
import {
  add,
  remove,
  increaseQuantity,
  decreaseQuantity,
  updateTotal,
} from "../store/CartSlice";

function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.items);
  // console.log(products);
  const total = useSelector((state) => state.cart.total);

  const handleRemove = (productId) => {
    dispatch(remove(productId));
    dispatch(updateTotal());
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
    dispatch(updateTotal());
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
    dispatch(updateTotal());
  };

  return (
    <div>
      <h3>Cart</h3>
      <div className="cartwrapper">
        {products.map((product) => (
          <div className="cartCard" key={product.id}>
            <img src={product.image} alt="" />
            <h4>{product.title}</h4>
            <h5>Total: ₹{product.total}</h5>
            <button className="btn" onClick={() => handleRemove(product.id)}>
              Remove
            </button>
            <button
              className="btn"
              onClick={() => handleIncreaseQuantity(product.id)}
            >
              +
            </button>
            <h5>{product.quantity}</h5>
            <button
              className="btn"
              onClick={() => handleDecreaseQuantity(product.id)}
            >
              -
            </button>
          </div>
        ))}
      </div>
      <div>
        <h4>Total Cost: ₹{total.toFixed(2)}</h4>
      </div>
    </div>
  );
}

export default Cart;
