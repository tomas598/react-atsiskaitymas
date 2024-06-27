import { doSignInWithEmailAndPassword } from "../../firebase/firebaseAuth";
import { useAuth } from "../../context/authContext/AuthContext";
import { useState } from "react";

export const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isSigningIn) {
        setIsSigningIn(true);
        await doSignInWithEmailAndPassword(email, password);
        console.log("User signed in");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="email..."
            name="email"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
        </div>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <div className="mb-3">
          <button
            className="btn btn-secondary"
            type="submit"
            disabled={isSigningIn}
          >
            {isSigningIn ? "Signing in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
