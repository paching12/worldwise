import { useAuth } from "@contexts";
import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";

function User() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout?.();
    navigate("/login");
  }

  return (
    <div className={styles.user}>
      <img src={user?.avatar} alt={user?.name} />
      <span>Welcome, {user?.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default User;
