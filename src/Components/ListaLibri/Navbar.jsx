import React from 'react';
import './Navbar.css';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib } from '@fortawesome/free-solid-svg-icons'
import { faBook,faRightFromBracket } from '@fortawesome/free-solid-svg-icons'




export const BrandExample = ({body}) => {
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("userId");
  const handleLogout = () => {
    window.localStorage.removeItem("userId");
    navigate("/");
    console.log(navigate);
  };

  
  return (
    <>
  { window.localStorage.getItem("userId") ? <div style={{ display: 'flex' }}>
  <div className="main-container" >
  <div className="lateral-navbar">
      <h2>Navbar</h2>
      <ul>
        <li>
        <FontAwesomeIcon icon={faBook} /><Link to="/libri">Library</Link>
        </li>
        <li>
        <FontAwesomeIcon icon={faPenNib} /><Link to="/add-libro">Add Item</Link>
        </li>
        <li>
        <FontAwesomeIcon icon={faRightFromBracket} /><a to="#" onClick={() => handleLogout()}>Logout</a>
        </li>
      </ul>
    </div>
  </div>
  <div style={{ paddingTop: "30px", paddingLeft:"20px"}}>
    {body}
    
  </div>
</div> : <Navigate to="/"></Navigate>} 
</>
)};

export default BrandExample;

