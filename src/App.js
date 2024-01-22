import logo from './logo.svg';
import './App.css';
import { Navigazione } from './Routes';
import { LoginSignup } from './Components/Login/LoginSignup';
import { ListaLibriComponent } from './Components/ListaLibri/lista';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/saga-purple/theme.css";

function App() {
  return (
    <div>
      <PrimeReactProvider>
    <Navigazione></Navigazione>
    </PrimeReactProvider>
    </div>
  );
}

export default App;
