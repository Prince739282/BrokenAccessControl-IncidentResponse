import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/v1/auth/register", {
        name,
        email,
        password,
      });

      setMessage("Registration successful");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log("Register error:", error.response?.data);

      setMessage(
        error.response?.data?.errors?.[0]?.msg ||
          error.response?.data?.message ||
          error.message,
      );
    }
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "80px auto",
        fontFamily: "Arial",
      }}
    >
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
