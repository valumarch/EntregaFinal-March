import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/config";
import { getDoc, doc } from "firebase/firestore";
import ItemDetail from "../ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);

  const { idItem } = useParams();

  useEffect(() => {
    const newDoc = doc(db, "productos", idItem);
    getDoc(newDoc)
      .then(res => {
        const data = res.data();
        const newProd = { id: res.id, ...data };
        setProducto(newProd);
      })
      .catch(error => console.log(error));
  }, [idItem]);

  return (
    <div>
      <ItemDetail {...producto} />
    </div>
  );
};

export default ItemDetailContainer;
