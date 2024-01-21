import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginSignup } from './Components/Login/LoginSignup';
import { ListaLibriComponent } from './Components/ListaLibri/lista';


export const Navigazione = () => {
    return (
            <Router>
                <Routes>
                <Route path="/" exact element={<LoginSignup />}>   
                </Route>
                <Route path="/libri" element={<ListaLibriComponent />}>   
                </Route>
                </Routes>
            </Router>
    )
}