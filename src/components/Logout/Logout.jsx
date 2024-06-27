import { doSignOut } from "../../firebase/firebaseAuth";
import { useAuth } from "../../context/authContext/AuthContext";

export const Logout = () => {
  const { userLoggedIn, setUserLoggedIn } = useAuth();

  const signOut = async () => {
    try {
      await doSignOut();
      setUserLoggedIn(false);
      console.log(userLoggedIn);
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
