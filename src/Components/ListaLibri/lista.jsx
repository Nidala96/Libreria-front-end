import React, { useState, useEffect } from "react";
import axios from "axios";
import { LibroCard } from "./LibroCard";
import "./lista.css";
import Form from "react-bootstrap/Form";

export const ListaLibriComponent = () => {
  const [listaLibri, setListaLibri] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_LOCAL_URL
          }libro/get-libri?utenteId=${window.localStorage.getItem("userId")}`
        );
        setListaLibri(response.data);
      } catch (error) {
        console.error(
          "Errore durante il recupero della lista dei libri:",
          error
        );
      }
    };

    fetchData();
  }, []);

  // Funzione per filtrare i libri in base al termine di ricerca
  const filteredLibri = listaLibri.filter(
    (libro) =>
      libro.titolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.autore.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text">Lista libri</h1>
      <div className="underline"></div>
      <Form.Control
        className="search-bar"
        type="text"
        placeholder="Cerca libri..."
        value={searchTerm}
        style={{ paddingRight: 30 }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredLibri.map((libro) => (
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </div>
    </div>
  );
};
