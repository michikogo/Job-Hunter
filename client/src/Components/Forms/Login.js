import { character15, character18 } from "../../Assets";
import LoginForm from "./LoginForm";
import "./index.css";

const Login = () => {
  return (
    <div className="register-grid">
      <div>
        <img src={character18} alt="" className="character18-image" />
      </div>
      <div>
        <LoginForm />
      </div>
      <div>
        <img src={character15} alt="" className="character15-image" />
      </div>
    </div>
  );
};

export default Login;
