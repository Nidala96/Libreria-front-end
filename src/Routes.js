import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginSignup } from './Components/Login/LoginSignup';
import { ListaLibriComponent } from './Components/ListaLibri/lista';
import { BrandExample } from './Components/ListaLibri/Navbar';
import { BookForm } from './Components/ListaLibri/paginaAggiungiLibro'



export const Navigazione = () => {

    return (
            <Router>
                <Routes>
                <Route path="/" exact element={<LoginSignup />}>   
                </Route>
                <Route path="/libri" element={<BrandExample body={<ListaLibriComponent />}>
                        </BrandExample>}>   
                </Route>
                <Route path="/add-libro" element={<BrandExample body={<BookForm />}>         
                        </BrandExample>}>   
                </Route>
                </Routes>
            </Router>
    )
}