import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

export const LibroDetail = () => {
  const [libro, setLibro] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedLibro, setModifiedLibro] = useState({});

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/libro/get-libro/${window.localStorage.getItem("libroId")}`);
        console.log(window.localStorage.getItem("userId"));
        setLibro(response.data);
        setModifiedLibro(response.data); 
      } catch (error) {
        console.error('Errore durante il recupero del libro', error);
      }
    };

    fetchLibro();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/libro/mod-book?utenteId=${window.localStorage.getItem("userId")}&libroId=${window.localStorage.getItem("libroId")}`, modifiedLibro);
      setLibro(modifiedLibro);
      setIsEditing(false);
    } catch (error) {
      console.error('Errore durante la modifica del libro', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setModifiedLibro(libro); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModifiedLibro((prevLibro) => ({ ...prevLibro, [name]: value }));
  };

  if (!libro) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    
    <div>
      <h1 className="text">Modifica Libri</h1>
      <div className="underline"></div>
      <h1>{libro.titolo}</h1>
      {isEditing ? (
        <>
           <p>
           Autore: <input type="text" name="autore" value={modifiedLibro.autore} onChange={handleInputChange} />
          </p>
          <p>
            Codice ISBN: <input type="text" name="codice-isbn" value={modifiedLibro.codiceISBN} onChange={handleInputChange} />
          </p>
          <p>
            Data Aggiunta: <input type="data" name="data-aggiunta" value={modifiedLibro.dataAggiunta} onChange={handleInputChange} />
          </p>
          <InputTextarea autoResize value={modifiedLibro.trama} onChange={(e) => handleInputChange({ target: { name: "trama", value: e.target.value } })} rows={5} cols={30} />
          <p>
            Numero letture: <input type="number" name="numeroLettureComplete" value={modifiedLibro.numeroLettureComplete} onChange={handleInputChange} />
          </p>
          <Button onClick={handleSaveClick}>Salva</Button>
          <Button onClick={handleCancelClick}>Annulla</Button>
        </>
      ) : (
        <>
          <p>Autore: {libro.autore}</p>
          <p>Codice ISBN: {libro.codiceISBN}</p>
          <p>Data Aggiunta: {libro.dataAggiunta}</p>
          <p>Trama</p>
          <InputTextarea autoResize value={libro.trama} rows={5} cols={30} />
          <p>Numero letture: {libro.numeroLettureComplete}</p>
          <Button onClick={handleEditClick}>Modifica</Button>
        </>
      )}
    </div>
  );
};

export default LibroDetail;

