import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import "./index.scss";

function Header() {
  return (
    <div className='header'>
        <Link to="/"><img src={logo} alt="Logo" /></Link>
        
        <ul>
            <li><Link to="/livros">Listar livros</Link></li>
            <li><Link to="/livros/cadastro">Cadastrar livros</Link></li>
        </ul>
    </div>
  );
}

export default Header;
