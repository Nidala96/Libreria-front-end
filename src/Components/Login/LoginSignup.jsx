import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import { Link } from 'react-router-dom';
import { ListaLibriComponent } from 'C:/Users/Nidala/Vs-Code/libreria/src/Components/ListaLibri/lista.jsx';
import { useNavigate } from "react-router-dom";


import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

export const LoginSignup = () => {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const navigate = useNavigate();

  

  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/libro?nome=${nome}&cognome=${cognome}`);
      // Esegui le azioni desiderate in base alla risposta del server
      console.log(response.data);
      navigate("/libri", { state: response.data }); 
    } catch (error) {
      // Gestisci eventuali errori nella richiesta
      console.error('Errore durante il login:', error);
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Sign up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input
            type="text"
            placeholder='Nome'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="text"
            placeholder='Cognome'
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder='Email id' />
        </div>
      </div>
      <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
      <div className="submit-container">
        <div className="submit" onClick={handleLogin}>
          Sign up
        </div>
        <div className="submit" onClick={handleLogin}>
        Login
        </div>
      </div>
    </div>
  );
};

