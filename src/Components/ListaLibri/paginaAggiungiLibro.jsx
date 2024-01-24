import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

export function BookForm() {
  const [bookData, setBookData] = useState({
    titolo: "",
    autore: "",
    codiceISBN: "",
    trama: "",
    numeroLettureComplete: 0,
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setImageFile(files[0]);
    } else {
      setBookData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    // e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL_URL}libro/save-book?utenteId=${window.localStorage.getItem(
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
        const libro = await response.json();
        await addImageToBook(libro.id);
      } else {
        console.error("Failed to add book.");
        toast.error("Something wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const addImageToBook = async (libroId) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
  
      const imageResponse = await fetch(
        `${process.env.REACT_APP_LOCAL_URL}libro/add-libro-image/${libroId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
  
      if (imageResponse.ok) {
        console.log("Image added successfully!");
        toast.success("Image added successfully!");
      } else {
        console.error("Failed to add image.");
        toast.error("Something wrong with image upload!");
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
            placeholder="ISBN"
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
          <Form.Control type="file" name="file" onChange={handleChange} />
        </Form.Group>
        <Button
          style={{
            backgroundColor: "#0096b5",
            borderColor: "#0096b5",
            marginTop: 15,
          }}
          variant="primary"
          onClick={handleSubmit}
        >
          Aggiungi
        </Button>
      </Form>
    </div>
  );
}
