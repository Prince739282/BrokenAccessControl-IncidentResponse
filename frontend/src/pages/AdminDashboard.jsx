import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>{message}</p>

      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default AdminDashboard;
