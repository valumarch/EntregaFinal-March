import "./ItemListContainer.css";
import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../services/config";

const ItemListContainer = ({ greeting }) => {
  const [productos, setProductos] = useState([]);

  const { idCategoria } = useParams();

  useEffect(() => {
    const myProducts = idCategoria
      ? query(collection(db, "productos"), where("idCat", "==", idCategoria))
      : collection(db, "productos");
    getDocs(myProducts)
      .then((res) => {
        const newProds = res.docs.map(doc => {
          const data = doc.data()
          return {id: doc.id, ...data}
        })
        setProductos(newProds);
      })
      .catch((error) => console.log(error))
  }, [idCategoria]);

  return (
    <div className="itemListContainer">
      <h2 className="titulo"> {greeting} </h2>
      <ItemList productos={productos} />
    </div>
  );
};

export default ItemListContainer;
