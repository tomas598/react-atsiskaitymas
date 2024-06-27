import "bootstrap/dist/css/bootstrap.min.css";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login";
import { AuthProvider } from "./context/authContext/AuthContext";
import { Header } from "./components/header/Header";
import { Home } from "./components/home/Home";
import Router from "./router/Router";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Router />
    </AuthProvider>
  );
}

export default App;
