
import { useState } from "react";
import { signupUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await signupUser({
        name,
        email,
        password,
      });

      console.log(response.data);

      alert("Signup successful");

      navigate("/signin");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Signup failed"
      );
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Signup</h1>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button type="submit">Signup</button>
          <p>
            Already have an account? <a href="/signin">Signin</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

