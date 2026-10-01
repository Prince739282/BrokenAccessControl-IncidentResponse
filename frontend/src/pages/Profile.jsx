import { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const handleGetUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        `http://localhost:8000/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(response.data.user);
      setMessage("");
    } catch (error) {
      setUser(null);
      setMessage(error.response?.data?.message || "Access denied");
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "60px auto",
        fontFamily: "Arial",
      }}
    >
      <h2>User Profile</h2>

      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          boxSizing: "border-box",
        }}
      />

      <button onClick={handleGetUser}>Get User</button>

      {message && <p>{message}</p>}

      {user && (
        <div style={{ marginTop: "20px" }}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
