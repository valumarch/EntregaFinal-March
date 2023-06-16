import './Item.css'
import { Link } from 'react-router-dom'


const Item = ({id, nombre, precio, imagen}) => {
    return (
    <div className="cardProducto">
        <img className="imgProducto" src={imagen} alt={nombre} />
        <h3 className="nombreProducto">{nombre}</h3>
        <p className="textoProducto">Precio: ${precio}</p>
        <p className="textoProducto">ID: {id}</p>
        <Link to={`/item/${id}`} className="btnProducto">Ver detalles</Link>
    </div>
)
}

export default Item