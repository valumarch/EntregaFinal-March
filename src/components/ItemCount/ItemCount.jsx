import { Link } from 'react-router-dom';
import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({inicial, stock, funcionAgregar}) => {
    const [contador, setContador] = useState(inicial);
    
    const incrementar = () => {
        if(contador < stock) {
            setContador(contador + 1);
        }
    }

    const decrementar = () => {
        if(contador > inicial){
            setContador(contador - 1);
        }
    }

  return (
   
    <div className='botones'>
        <div className="contador">
            <button className='btnContador' onClick={ decrementar }> - </button>
            <span className='numContador'> {contador} </span>
            <button className='btnContador' onClick={ incrementar }> + </button>
        </div>
        { stock > 0 && <button className="btnAgregar" onClick={()=> funcionAgregar(contador)}> Agregar al Carrito </button>}
        <Link to="/" className = "btnSeguir" > Continuar con la compra</Link>
    </div>
   
  )
}



export default ItemCount