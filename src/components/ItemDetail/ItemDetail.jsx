import "./ItemDetail.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import ItemCount from "../ItemCount/ItemCount";

const ItemDetail = ({ id, nombre, precio, imagen, stock }) => {
  const [addQuantity, setAddQuantity] = useState(0);

  const { addProduct } = useContext(CartContext);

  const quantityHandler = (cantidad) => {
    setAddQuantity(cantidad);
    const item = { id, nombre, precio };
    addProduct(item, cantidad);
  };

  return (
    <div className="contenedorDetalles">
      <img src={imagen} alt={nombre} className="imgDetalles" />
    <div className="detalles">
      <h2 className="tituloDetalles"> {nombre} </h2>
      <p className="textoDetalles">Precio: ${precio} </p>
      <p className="textoDetalles">Id: {id} </p>
      {
        addQuantity > 0 ? (<><Link to="/cart" className="btnTerminar">Terminar Compra</Link> <Link to="/" className="btnSeguir">Ver más productos</Link></>) : (<ItemCount inicial={1} stock={stock} funcionAgregar={quantityHandler}/>)
        }
        </div>
    </div>
  );
};

export default ItemDetail;
