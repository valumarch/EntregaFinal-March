import { CartContext } from "../../context/CartContext"
import { useContext } from "react"
import CartItem from "../CartItem/CartItem"
import { Link } from "react-router-dom"
import "./Cart.css"

const Cart = () => {
    const {cart, emptyCart, total, totalQuantity} = useContext(CartContext);

    if(totalQuantity === 0){
        return(
            <div className="cart">
                <h2>No hay productos en el carrito</h2>
                <Link to='/' className="btnCart">Ver más productos</Link>
            </div>
        )
    } 

  return (
    <div className="cart">
        <h3 className="cartHeader">carrito de compras</h3>
        {cart.map(producto => <CartItem key={(producto.id)}{...producto}/>)}
        <hr />
        <p className="cartCantidad">Cantidad de productos seleccionados: {totalQuantity}</p>
        <h3 className="cartTotal">Total: ${total}</h3>
        <button onClick={()=>emptyCart()} className="btnVaciar">Vaciar carrito</button>
        <Link to="/" className="btnSeguir">Ver más productos</Link>
        <Link to='/checkout' className="btnCart">Finalizar compra</Link>
    </div>
  )
}

export default Cart