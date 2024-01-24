import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';

export function BookForm() {
  const [bookData, setBookData] = useState({
    titolo: "",
    autore: "",
    codiceISBN: "",
    trama: "",
    numeroLettureComplete: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8081/libro/save-book?utenteId=${window.localStorage.getItem(
          "userId"
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );

      if (response.ok) {
        console.log("Book added successfully!");
        toast.success("Book added successfully!");
        // You can reset the form or perform any other action upon successful submission
      } else {
        console.error("Failed to add book.");
        toast.error("Something wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1 className="text">Aggiungi libro</h1>
      <div className="underline"></div>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Titolo</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Titolo"
            name="titolo"
            value={bookData.titolo}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Autore</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Autore"
            name="autore"
            value={bookData.autore}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">Codice ISBN</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Title"
            name="codiceISBN"
            value={bookData.codiceISBN}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup.Text id="basic-addon4">Trama</InputGroup.Text>
        <InputGroup>
          <Form.Control
            as="textarea"
            placeholder="Description"
            name="trama"
            value={bookData.trama}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" />
      </Form.Group>
        <Button
          style={{
            backgroundColor: "#0096b5",
            borderColor: "#0096b5",
            marginTop: 15,
          }}
          variant="primary" onClick={handleSubmit}
        >
          
          Aggiungi
        </Button>
        
      </Form>
    </div>
  );
}

export default BookForm;
