import { doSignOut } from "../../firebase/firebaseAuth";

export const Logout = () => {
  return (
    <button className="btn btn-danger" onClick={doSignOut}>
      Logout
    </button>
  );
};
