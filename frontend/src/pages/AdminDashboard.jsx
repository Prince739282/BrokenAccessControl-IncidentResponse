import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const getAdminDashboard = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          "http://localhost:8000/api/v1/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setMessage(response.data.message);
      } catch (error) {
        if (error.response?.status === 403) {
          setMessage("Access denied. Admin only.");
        } else {
          setMessage("Something went wrong.");
        }
      }
    };

    getAdminDashboard();
  }, []);

  useEffect(() => {
    const getIncidents = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          "http://localhost:8000/api/v1/users/incidents/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setIncidents(response.data.incidents);
      } catch (error) {
        setMessage(error.response?.data?.message || "Unable to load incidents");
      }
    };

    getIncidents();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>{message}</p>

      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default AdminDashboard;
