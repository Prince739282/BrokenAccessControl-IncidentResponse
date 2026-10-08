import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [message, setMessage] = useState("");
  const [incidents, setIncidents] = useState([]);

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
        setMessage(
          error.response?.data?.message || "Unable to load security incidents",
        );
      }
    };

    getIncidents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>

          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            Admin
          </span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Security Incidents
          </h2>

          <p className="text-gray-500 mt-2">
            Monitor unauthorized access attempts detected by the system.
          </p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{message}</p>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Incident Logs
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Total incidents: {incidents.length}
            </p>
          </div>

          {incidents.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No security incidents found.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {incidents.map((incident) => (
                <div
                  key={incident._id}
                  className="p-6 hover:bg-gray-50 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Unauthorized Access Attempt
                      </h4>

                      <p className="text-sm text-gray-500 mt-1">
                        Security incident detected by the system
                      </p>
                    </div>

                    <span
                      className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${
                        incident.status === "Blocked"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {incident.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <p className="text-sm text-gray-500">User</p>

                      <p className="text-gray-800 font-medium mt-1">
                        {incident.user?.name || "Unknown"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Email</p>

                      <p className="text-gray-800 font-medium mt-1 break-all">
                        {incident.user?.email || "Unknown"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Target User ID</p>

                      <p className="text-gray-800 font-medium mt-1 break-all">
                        {incident.targetUser}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Action</p>

                      <p className="text-gray-800 font-medium mt-1">
                        {incident.action}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;