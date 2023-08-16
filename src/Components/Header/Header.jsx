import { Link } from "react-router-dom";
import React, {useState } from "react";
import "./header.css";
import { GiHamburgerMenu } from "react-icons/gi";


function Header() {
  const [isOpen, setOpen] = useState(false)


  return (
    <div className="header">
      <a href="/">
        <img className="logo" src="/assets/logoSinFondo.png" alt="logo" />
      </a>

      <nav className="nav">
        <ul className={`navList ${isOpen && "open"}`}>
          <li className="liHeader">
            <a className="ancla" href="/">
              Inicio
            </a>
          </li>
          <li className="liHeader">
            <Link className="ancla" to={"/empresa"}>
              Empresa
            </Link>
          </li>
          <li className="liHeader"> 
            <a className="ancla" onClick={()=>setOpen(!isOpen)} href="/#servicios">
              Servicios
            </a>
          </li>
          <li className="liHeader">
            <Link className="ancla" to={"/estudio"}>
              Estudio
            </Link>
          </li>
          <li className="liHeader">
            <a className="ancla" onClick={()=>setOpen(!isOpen)} href="#contacto">
              Contacto
            </a>
          </li>
        </ul>
        <div className="toggle" onClick={()=>setOpen(!isOpen)}>
        <GiHamburgerMenu />
      </div>
      </nav>
      

      <Link to={"/pageLogin"}>
        <button className="btnGray">Iniciar sesión</button>
      </Link>
    </div>
  );
}

export default Header;
