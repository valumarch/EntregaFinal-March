
import "./NavBar.css"
import CartWidget from "../CartWidget/CartWidget"
import { NavLink, Link } from "react-router-dom"

const NavBar = () => {
    return (
        <header className="navbar navbar-expand-lg">
                <Link  to={"/"} className="linkNav tituloNav">
                <h1>Seda Tejidos</h1>
                </Link>

                <nav>
                    <ul className="navbar-nav">
                        
                        <li className="nav-item">
                            <NavLink to={"/categoria/1"} className="linkNav">Indumentaria</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/categoria/2'} className="linkNav">
                            Accesorios
                            </NavLink>
                        </li>

                    </ul>
                </nav>
                <CartWidget/>
        </header>
    )
}

export default NavBar