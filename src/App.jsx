import "bootstrap/dist/css/bootstrap.min.css";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login";
import { AuthProvider } from "./context/authContext/AuthContext";
import { Header } from "./components/header/Header";
function App() {
  return (
    <AuthProvider>
      <Header />
      <Register />
      <Login />
    </AuthProvider>
  );
}

export default App;
