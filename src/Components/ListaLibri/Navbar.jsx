import React from "react";
import "./Navbar.css";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import {
  faFileCsv,
  faBook,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from 'react-toastify';

export const BrandExample = ({ body }) => {
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("userId");
  const handleLogout = () => {
    window.localStorage.removeItem("userId");
    navigate("/");
    console.log(navigate);
    toast.success("Sei uscito!");
  };

  const writeCsv = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/libro/get-csv?utenteId=${window.localStorage.getItem("userId")}`,
        { responseType: 'blob' }  // Indica che la risposta è di tipo blob
      );
  
      const blob = new Blob([response.data], { type: 'application/csv' });
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'libri.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      toast.success("CSV scaricato!");
    } catch (error) {
      console.error("Errore durante la creazione del CSV:", error);
      toast.error("Errore durante la creazione del CSV");
    }
  };
  

  return (
    <div className="full-height-container">
      {window.localStorage.getItem("userId") ? (
        <div className="flex-container">
          <div className="main-container">
            <div className="lateral-navbar">
              <h2>Libreria</h2>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faBook} />
                  <Link to="/libri">Books</Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faPenNib} />
                  <Link to="/add-libro">Add Item</Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faFileCsv} />
                  <a onClick={writeCsv}>Download CSV</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <a to="#" onClick={() => handleLogout()}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="body-container">
            {body}
          </div>
        </div>
      ) : (
        <Navigate to="/"></Navigate>
      )}
    </div>
  );
};

export default BrandExample;
