import React from "react";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { db } from "../../services/config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import "./Checkout.css";

const Checkout = () => {
  const { cart, emptyCart, total } = useContext(CartContext);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  const formHandler = (event) => {
    event.preventDefault();

    if (!name || !lastName || !phoneNum || !email || !emailConf) {
      setError("Por favor complete todos los campos");
      return;
    }

    if (email !== emailConf) {
      setError("Los emails ingresados no coinciden");
      return;
    }

    const order = {
      items: cart.map((prod) => ({
        id: prod.item.id,
        nombre: prod.item.id,
        cantidad: prod.cantidad,
      })),
      total: cart.reduce(
        (total, prod) => total + prod.item.precio * prod.cantidad,
        0
      ),
      name,
      lastName,
      phoneNum,
      email,
    };

    Promise.all(
      order.items.map(async (productOrder) => {
        const productRef = doc(db, "productos", productOrder.id);
        const productDoc = await getDoc(productRef);
        const currentStock = productDoc.data().stock;
        await updateDoc(productRef, {
          stock: currentStock - productOrder.cantidad,
        });
      })
    )
      .then(() => {
        addDoc(collection(db, "ordenes"), order)
          .then((docRef) => {
            setOrderId(docRef.id);
            emptyCart();
          })
          .catch((error) => {
            console.error("Error al crear la orden", error);
            setError("Se produjo un error al crear la orden");
          });
      })
      .catch((error) => {
        console.error("Error al actualizar el stock", error);
        setError("Se produjo un error al actualizar el stock");
      });
  };

  return (
    <div className="checkout">
      <h2 className="checkoutTitle">Checkout</h2>

      <form onSubmit={formHandler} className="form">
        {cart.map(prod => (
          <div key={prod.item.id}>
            <p>
              {prod.item.nombre} x {prod.cantidad}
            </p>
            <p> Precio: ${prod.item.precio} </p>
            <p> Total: ${prod.item.precio*prod.cantidad}</p>
            <hr />
          </div>
        ))}
        <p>Total $ {total}</p>

        <div>
        
          <input placeholder="Nombre"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
        
          <input placeholder="Apellido"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
         
          <input placeholder="Número de teléfono"
            type="text"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
          />
        </div>
        <div>
        
          <input placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          
          <input placeholder="Confirme su email"
            type="email"
            value={emailConf}
            onChange={(e) => setEmailConf(e.target.value)}
          />
        </div>
        {error && <p className="error"> {error} </p>}

        <button type="submit" className="btnFinalizar">Finalizar compra</button>
      </form>
      {orderId && (
        
        <>
          <h3>¡Gracias por tu compra!</h3>
          <p>El id de tu orden es {orderId}</p>
        </>
      )}
    </div>
  );
};

export default Checkout;
