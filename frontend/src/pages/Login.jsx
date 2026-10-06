import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        {
          email,
          password,
        },
      );

      localStorage.setItem("accessToken", response.data.accessToken);

      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
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
          Login
        </h2>

        <form onSubmit={handleLogin}>
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            Login
          </button>
        </form>

        {message && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "15px",
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
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
