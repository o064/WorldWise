import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthCotext";
import Button from "./Button";
import styles from "./User.module.css";


function User() {
  const navigate = useNavigate();
  const {user , logout }= useAuth();

  function handleClick(){
    logout()
    navigate("/", {replace: true})
  }
  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <Button type="primary" onClick={handleClick}>Logout
      </Button>
    </div>
  );
}

export default User;

/*
CHALLENGE


3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
*/
