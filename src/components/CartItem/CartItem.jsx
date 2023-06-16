import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import "./CartItem.css"

const CartItem = ({item, cantidad}) => {
    const {deleteProduct} = useContext(CartContext);
    return (
    <div className="cartItem">
        <h2 className="cartTitulo"> {item.nombre} </h2>
        <p className="cartCantidad">Cantidad: {cantidad}</p>
        <h3 className="cartTotal">Precio: ${item.precio}</h3>
        <button onClick={()=>deleteProduct(item.id)} className="btnVaciar">Eliminar</button>
    </div>
  )
}

export default CartItem