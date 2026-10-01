import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          "http://localhost:8000/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    };

    getUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Security Dashboard</h1>

      {user && (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        <button onClick={() => navigate("/profile")}>User Profile</button>

        <button
          onClick={() => navigate("/admin")}
          style={{ marginLeft: "10px" }}
        >
          Admin Dashboard
        </button>

        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
