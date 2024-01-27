import React, { useState } from "react";
import axios from "axios";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";
import email_icon from "../Assets/email.png";
import { toast } from 'react-toastify';

export const LoginSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cognome, setCognome] = useState("");
  const navigate = useNavigate();
  const [stato, setStato] = useState(true)

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_URL}auth/signin`,
        {
          username: username,
          password: password,
        }
      );
      // Esegui le azioni desiderate in base alla risposta del server
      console.log(response.data);
      window.localStorage.setItem("token", response.data.token);
      toast.success("Sei loggato!");
      navigate("/libri");
    } catch (error) {
      // Gestisci eventuali errori nella richiesta
      console.error("Errore durante il login:", error);
      toast.error("Credenziali errate!");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_URL}auth/signup`,
        {
          username: username,
          email: email,
          password: password,
          cognome: cognome,
        }
      );
      // Esegui le azioni desiderate in base alla risposta del server
      console.log(response.data);
      toast.success("Registrazione avvenuta con successo!");
      setStato(true)
    } catch (error) {
      // Gestisci eventuali errori nella richiesta
      console.error("Errore durante la registrazione:", error);
      toast.error("Errore durante la registrazione");
    }
  };

  return (
    <>
      {stato ? (<div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="text" placeholder='password' value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="forgot-password">Non sei registrato? <span onClick={() => setStato(false)}>Click Here!</span></div>
        <div className="submit-container">
          <div style={{ backgroundColor: "#0096b5", borderColor: "#0096b5" }} className="submit" onClick={handleLogin}>
            Login
          </div>
        </div>
      </div>) : <div className="container">
          <div className="header">
            <div className="text">Register</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Nome"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
              />
            </div>
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="forgot-password">
            Sei già registrato?{" "}
            <span onClick={() => setStato(true)}>Click Here!</span>
          </div>
          <div className="submit-container">
            <div
              style={{ backgroundColor: "#0096b5", borderColor: "#0096b5" }}
              className="submit"
              onClick={handleRegister}
            >
              Register
            </div>
          </div>
        </div>}
    </>
  );
};
