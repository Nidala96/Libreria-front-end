import "./App.css";
import { Navigazione } from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/saga-purple/theme.css";
import "primereact/resources/primereact.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App({ Component, pageProps }) {
  return (
    <div>
      <PrimeReactProvider>
        <Navigazione></Navigazione>
        <ToastContainer></ToastContainer>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
