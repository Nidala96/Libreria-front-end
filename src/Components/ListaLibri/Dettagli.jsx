import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { InputTextarea } from "primereact/inputtextarea";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import "./dettagli.css";
import { ToastContainer, toast } from 'react-toastify';

export const LibroDetail = () => {
  const [libro, setLibro] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedLibro, setModifiedLibro] = useState({});
  

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/libro/get-libro/${window.localStorage.getItem(
            "libroId"
          )}`
        );
        console.log(window.localStorage.getItem("userId"));
        setLibro(response.data);
        setModifiedLibro(response.data);
      } catch (error) {
        console.error("Errore durante il recupero del libro", error);
      }
    };

    fetchLibro();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8081/libro/mod-book?utenteId=${window.localStorage.getItem(
          "userId"
          
        )}&libroId=${window.localStorage.getItem("libroId")}`,
        modifiedLibro
      );
      setLibro(modifiedLibro);
      setIsEditing(false);
      toast.success("Libro modificato!")
      
    } catch (error) {
      console.error("Errore durante la modifica del libro", error);
      toast.error("Errore durante la modifica del libro")
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
      {isEditing ? (
        <>
          <h1 className="text">Modifica Libro</h1>
          <div className="underline"></div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                name="titolo"
                value={modifiedLibro.titolo}
                onChange={handleInputChange}
              />
              <Form.Label>Autore</Form.Label>
              <Form.Control
                type="text"
                name="autore"
                value={modifiedLibro.autore}
                onChange={handleInputChange}
              />
              <Form.Label>Codice ISBN:</Form.Label>
              <Form.Control
                type="text"
                name="codiceISBN"
                value={modifiedLibro.codiceISBN}
                onChange={handleInputChange}
              />
              <Form.Label>Data aggiunta:</Form.Label>
              <Form.Control
                type="text"
                name="dataAggiunta"
                value={modifiedLibro.dataAggiunta}
                onChange={handleInputChange}
              />
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Trama</Form.Label>
                <Form.Control
                  type="text"
                  name="trama"
                  value={modifiedLibro.trama}
                  onChange={handleInputChange}
                  as="textarea"
                  rows={5}
                />
              </Form.Group>
              <Form.Label>Numero letture:</Form.Label>
              <Form.Control
                type="text"
                name="numeroLettureComplete"
                value={modifiedLibro.numeroLettureComplete}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
          <>
          <Button
            style={{
              backgroundColor: "#3c009d",
              borderColor: "#3c009d",
              marginRight: 10,
            }}
            onClick={() => {
              handleSaveClick();
            }}>
            Salva
          </Button>
          </>
          <Button
            style={{ backgroundColor: "#3c009d", borderColor: "#3c009d" }}
            onClick={handleCancelClick} 
          >
            Annulla
          </Button>
          
        </>
      ) : (
        <>
          <h1 className="text">Dettaglio Libro</h1>
          <h2 class="dettaglio-titolo">{libro.titolo}</h2>
          <h4 class="dettaglio-autore">{libro.autore}</h4>
          <p><strong>ISBN: </strong>{libro.codiceISBN} <strong>Data Aggiunta:</strong>{" "}
            {format(libro.dataAggiunta, "MMMM do yyyy")}</p>
          <p class="dettaglio-descrizione"><strong>Descrizione</strong></p>
          <div className="underline"></div>
          <p>{libro.trama}</p>
          <p class="body-descrizione"><strong>Numero letture:</strong> {libro.numeroLettureComplete}</p>
          <Button
            style={{ backgroundColor: "#3c009d", borderColor: "#3c009d" }}
            onClick={handleEditClick}
          >
            Modifica
          </Button>
        </>
      )}
    </div>
  );
};

export default LibroDetail;
