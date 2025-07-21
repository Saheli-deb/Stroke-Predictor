import React, { useState } from "react";
import nexusLogo from "../assets/nexus-logo.png";

const Login = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // Simulate login (since backend doesn't have login endpoint)
    setTimeout(() => {
      if (form.username && form.password) {
        setMessage("Login successful!");
        if (onLoginSuccess) onLoginSuccess(form.username);
      } else {
        setMessage("Invalid credentials.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto bg-white/90 rounded-xl shadow-lg p-8 mt-12">
      <div className="flex flex-col items-center mb-4">
        <img src={nexusLogo} alt="Nexus Logo" className="w-20 h-20 mb-2" />
        <h2 className="text-2xl font-bold mb-2 text-indigo-800 text-center">Login</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-indigo-700 font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-indigo-700 font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {message && <div className="mt-4 text-center text-indigo-700 font-medium">{message}</div>}
    </div>
  );
};

export default Login; 