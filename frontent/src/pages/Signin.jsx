
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinUser } from "../services/api";
import "./Signin.css";
import { Link } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await signinUser({
        email,
        password,
      });

      console.log(response.data);

      // JWT token save
      localStorage.setItem("token", response.data.token);

      // User information save
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Signin successful");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Signin failed"
      );
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1>Signin</h1>

        <form onSubmit={handleSignin}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Signin
          </button>
          <p>
            Don't have an account? <Link to="/">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;

