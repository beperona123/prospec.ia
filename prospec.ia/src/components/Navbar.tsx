import "./Navbar.css";
import { Search } from "lucide-react";
import logo from "../assets/logoLeadia.png"; // importar a imagem
import { LeadFormDialog } from './LeadFormDialog';
import{useState} from 'react';

export default function Navbar() {
    const [open, setOpen] = useState<boolean>(false);
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <img src={logo} alt="Logo Leadia" />
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-bar">
          <select id="pesquisa" name="Pesquisa">
            <option value="cliente">Cliente</option>
            <option value="email">Email</option>
            <option value="produto">Produto</option>
            <option value="preferencias">Preferências</option>
            <option value="objecoes">Objeções</option>
            <option value="sugestao">Sugestão</option>
          </select>
          <input type="text" placeholder="Procurar" />
        </div>

        <div className="logo-lupa">
          <button className="search-btn">
            {" "}
            <Search />{" "}
          </button>
        </div>
      </div>

      <div className="navbar-right">
       <LeadFormDialog />

        <div className="user-initial">V</div>
      </div>
    </header>
  );
}