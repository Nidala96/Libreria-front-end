import React from 'react';
import { Card, Button } from 'react-bootstrap';
import book_image from '../Assets/book.jpg';
import './libroCard.css';

export const LibroCard = ({ libro }) => {
  return (
    <Card style={{ width: '18rem', border: '1px solid #ccc', borderRadius: '8px', margin: '8px', padding: '8px' }}>
      <Card.Img variant="top" src={book_image} />
      <Card.Body>
        <Card.Title class="titolo">{libro.titolo}</Card.Title>
        <Card.Text class="autore">
           {libro.autore}
        </Card.Text>
        {/* <Card.Text>
          <strong>ISBN:</strong> {libro.codiceISBN}
        </Card.Text> */}
        <div class="text-center">
        <Card.Text>
          <strong>Numero letture:</strong> {libro.numeroLettureComplete}
        </Card.Text>
        <Button style={ 
                        { backgroundColor: "#3c009d",  
                          borderColor: "#3c009d" }} variant="primary">Details</Button>
        </div>
      </Card.Body>
    </Card>
  );
};


