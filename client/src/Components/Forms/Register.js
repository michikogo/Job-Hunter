import { character15, character18 } from "../../Assets";
import RegisterForm from "./RegisterForm";
import "./index.css";

const Register = () => {
  return (
    <div className="register-grid">
      <div>
        <img src={character18} alt="" className="character18-image" />
      </div>
      <div>
        <RegisterForm />
      </div>
      <div>
        <img src={character15} alt="" className="character15-image" />
      </div>
    </div>
  );
};

export default Register;
