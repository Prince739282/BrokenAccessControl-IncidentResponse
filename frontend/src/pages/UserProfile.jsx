import { useState } from "react";
import axios from "axios";

const UserProfile = () => {
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl font-semibold">User Profile</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Search Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            View User Information
          </h2>

          <p className="text-sm text-gray-500 mt-2 mb-6">
            Enter a user ID to request profile information.
          </p>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            User ID
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="userId"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <button
              onClick={handleGetUser}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Get User
            </button>
          </div>

          {/* Error Message */}
          {message && (
            <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{message}</p>
            </div>
          )}
        </div>

        {/* User Information */}
        {user && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                User Information
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.role === "admin"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {user.role}
              </span>
            </div>

            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <p className="text-sm text-gray-500">Name</p>

                <p className="text-gray-800 font-medium mt-1">{user.name}</p>
              </div>

              <div className="border-b border-gray-100 pb-3">
                <p className="text-sm text-gray-500">Email</p>

                <p className="text-gray-800 font-medium mt-1">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Role</p>

                <p className="text-gray-800 font-medium mt-1">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Security Information */}
        <div className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="text-sm font-semibold text-blue-800">
            Access Control
          </h3>

          <p className="text-sm text-blue-700 mt-2">
            You can only access user information that you are authorized to
            view. Unauthorized requests are blocked and recorded as security
            incidents.
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
