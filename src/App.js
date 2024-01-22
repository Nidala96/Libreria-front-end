import logo from './logo.svg';
import './App.css';
import { Navigazione } from './Routes';
import { LoginSignup } from './Components/Login/LoginSignup';
import { ListaLibriComponent } from './Components/ListaLibri/lista';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
    <Navigazione></Navigazione>
    </div>
  );
}

export default App;
