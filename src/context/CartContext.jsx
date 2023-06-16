import { useState, createContext } from "react";

export const CartContext = createContext({ 
  cart: [],
  total: 0,
  totalQuantity: 0
});



export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const addProduct = (item, cantidad) => {
    const existingProduct = cart.find((prod) => prod.item.id === item.id);

    if (!existingProduct) {
      setCart(prev => [...prev, { item, cantidad }]);
      setTotalQuantity(prev => prev + cantidad);
      setTotal(prev => prev + (item.precio*cantidad));   
    } else {
      const cartUpdate = cart.map(prod => {
        if (prod.item.id === item.id) {
          return { ...prod, cantidad: prod.cantidad + cantidad };
        } else {
          return prod;
        }
      });
      setCart(cartUpdate);
      setTotalQuantity(prev => prev + cantidad);
      setTotal(prev => prev + (item.precio*cantidad));
    }
  };

  const deleteProduct = (id) => {
    const deletedItem = cart.find(prod => prod.item.id === id);
    const cartUpdate = cart.filter(prod => prod.item.id !== id);
    setCart(cartUpdate);
    setTotalQuantity(prev => prev - deletedItem.cantidad);
    setTotal(prev => prev - (deletedItem.item.precio*deletedItem.cantidad));
  };

  const emptyCart = () => {
    setCart([]);
    setTotal(0);
    setTotalQuantity(0);
  };

  return (
    <CartContext.Provider value={{cart, addProduct, deleteProduct, emptyCart, total, totalQuantity}}>
        {children}
    </CartContext.Provider>
  )
};
