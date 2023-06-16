import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./CartWidget.css";

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);
  const imgCarrito = "https://cdn-icons-png.flaticon.com/512/107/107831.png";

  return (
    <div>
      <Link to='/cart' className="cartWidget">
        <img className="imgCarrito" src={imgCarrito} alt="carrito de compras" />
        {totalQuantity > 0 && <span>{totalQuantity}</span>}
      </Link>
    </div>
  );
};
export default CartWidget;
