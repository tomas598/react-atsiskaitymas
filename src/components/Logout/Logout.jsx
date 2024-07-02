import { doSignOut } from "../../firebase/firebaseAuth";
import { useAuth } from "../../context/authContext/AuthContext";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const { userLoggedIn, setUserLoggedIn } = useAuth();

  const signOut = async () => {
    try {
      await doSignOut();
      setUserLoggedIn(false);
      console.log(userLoggedIn);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <button onClick={signOut} className="dropdown-item ">
      Logout
    </button>
  );
};
