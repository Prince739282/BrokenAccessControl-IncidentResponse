import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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

      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Create Account
        </h2>

        <form onSubmit={handleRegister}>
          <label>Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              marginBottom: "15px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              marginBottom: "15px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              marginBottom: "18px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "11px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#2563eb",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </form>

        {message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              color: message === "Registration successful" ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
