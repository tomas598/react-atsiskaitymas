import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { doCreateUserWithEmailAndPassword } from "../../firebase/firebaseAuth";
import { useAuth } from "../../context/authContext/AuthContext";
export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      await doCreateUserWithEmailAndPassword(email, password);
      console.log("user registered");
    } catch (error) {
      console.error(error);
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
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="password..."
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-secondary" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
