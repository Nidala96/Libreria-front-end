import React from "react";
import { Card, Button } from "react-bootstrap";
import book_image from "../Assets/missingBook.png";
import "./libroCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LibroCard = ({ libro }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    window.localStorage.setItem("libroId", libro.id);
    navigate("/get-libro");
    console.log(navigate);
  };

  const handleDelete = async () => {
    try {
      window.localStorage.setItem("libroId", libro.id);
      const response = await axios.delete(
        `${process.env.REACT_APP_LOCAL_URL}libro/delete?utenteId=${window.localStorage.getItem(
          "userId"
        )}&libroId=${window.localStorage.getItem("libroId")}`
      );
      window.location.reload(false);
    } catch (error) {
      console.error("Errore durante la cancellazione del libro", error);
    }
  };

  return (
    <Card
      style={{
        width: "16rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "8px",
        padding: "8px",
      }}
    >
      <Card.Img
        variant="top"
        src={
          libro.image !== null
            ? require("../Assets/" + libro.image.image)
            : book_image
        }
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title class="titolo">{libro.titolo}</Card.Title>
        <Card.Text class="autore">{libro.autore}</Card.Text>
        {/* <Card.Text>
          <strong>ISBN:</strong> {libro.codiceISBN}
        </Card.Text> */}
        <div class="text-center">
          <Card.Text>
            <strong>Numero letture:</strong> {libro.numeroLettureComplete}
          </Card.Text>
          <Button
            style={{
              backgroundColor: "#0096b5",
              borderColor: "#0096b5",
              marginRight: 10,
            }}
            variant="primary"
            onClick={handleClick}
          >
            Details
          </Button>
          <Button
            style={{ backgroundColor: "#0096b5", borderColor: "#0096b5" }}
            variant="primary"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
