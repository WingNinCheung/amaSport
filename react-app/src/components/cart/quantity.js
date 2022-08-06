import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { updateQuantity } from "../../store/cart";
import { getCart, deleteProduct } from "../../store/cart";

function Quantity({ product }) {
  const userId = product.user_id;
  const productId = product.product_id;

  const dispatch = useDispatch();
  const updatedCart = useSelector((state) => Object.values(state.cart));

  const myProduct = updatedCart.find(
    (product) => product.product_id == productId
  );
  const [qty, setQty] = useState(myProduct.quantity);

  useEffect(() => {
    dispatch(updateQuantity(userId, productId, qty));
  }, [dispatch, qty]);

  // useEffect(() => {
  //   setQty(myProduct.quantity);
  // }, []);
  const deleteCartItem = async (e) => {
    e.preventDefault();
    await dispatch(deleteProduct(userId, productId));
    await dispatch(getCart(userId));
  };

  return (
    <div>
      <label>Qty:</label>
      <select onChange={(e) => setQty(e.target.value)} value={qty}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
      </select>
      <button onClick={deleteCartItem}>Delete</button>
    </div>
  );
}

export default Quantity;
