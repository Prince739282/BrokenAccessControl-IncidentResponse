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
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">Security Dashboard</h1>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {user && (
          <>
            {/* Welcome */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome, {user.name}
              </h2>

              <p className="text-gray-500 mt-2">
                Manage your account and security features from your dashboard.
              </p>
            </div>

            {/* Account Information */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-5">
                Account Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-800 mt-1">{user.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800 mt-1">{user.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Role</p>

                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Available Actions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Profile Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-800">
                    User Profile
                  </h4>

                  <p className="text-gray-500 text-sm mt-2 mb-5">
                    View and manage your profile information.
                  </p>

                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    View Profile
                  </button>
                </div>

                {/* Admin Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Admin Dashboard
                  </h4>

                  <p className="text-gray-500 text-sm mt-2 mb-5">
                    View security incidents and administrative information.
                  </p>

                  <button
                    onClick={() => navigate("/admin")}
                    className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition"
                  >
                    Open Admin Dashboard
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
