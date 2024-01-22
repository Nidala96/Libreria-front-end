import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { LibroCard } from './LibroCard';
import { BrandExample } from './Navbar';
import './lista.css';
import { BookForm } from './paginaAggiungiLibro'

export const ListaLibriComponent = () => {
  const [listaLibri, setListaLibri] = useState([]);
  const userId = 0;
  
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/libro/get-libri?utenteId=${window.localStorage.getItem("userId")}`);
        setListaLibri(response.data);
      } catch (error) {
        console.error('Errore durante il recupero della lista dei libri:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    
  <div>
    <h1 className="text">Lista libri</h1>
    <div className="underline"></div>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {listaLibri.map((libro) => (
        <LibroCard key={libro.id} libro={libro} />
      ))}
    </div>
  </div>

  );
};








