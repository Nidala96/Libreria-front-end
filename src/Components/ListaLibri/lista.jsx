import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const ListaLibriComponent = () => {
  const [listaLibri, setListaLibri] = useState([]);
  const userId = 2;
  const location = useLocation();
  const data = location.state;
  
  

  useEffect(() => {
    const fetchData = async () => {
      console.log(data)
      try {
        const response = await axios.get(`http://localhost:8081/libro/get-libri?utenteId=${data}`);
        setListaLibri(response.data);
      } catch (error) {
        console.error('Errore durante il recupero della lista dei libri:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <h1>Lista dei Libri</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {listaLibri.map((libro) => (
          <div key={libro.id} style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '8px', padding: '8px' }}>
            <h3>{libro.titolo}</h3>
            <p><strong>Autore:</strong> {libro.autore}</p>
            <p><strong>ISBN:</strong> {libro.codiceISBN}</p>
            <p><strong>Data Aggiunta:</strong> {libro.dataAggiunta}</p>
            {/* Aggiungi altre informazioni del libro qui */}
          </div>
        ))}
        {listaLibri.map((libro) => (
  <Card key={libro.id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{libro.titolo}</Card.Title>
          <Card.Text>{libro.autore}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
  ))}
      </div>
    </div>
  );
};








