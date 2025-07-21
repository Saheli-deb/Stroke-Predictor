import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import PredictForm from "./components/PredictForm";
import nexusLogo from "./assets/nexus-logo.png";

function App() {
  const [section, setSection] = useState("home");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleNav = (target) => {
    setSection(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRegistered = () => {
    setSection("login");
  };

  const handleLoginSuccess = (username) => {
    setLoggedInUser(username);
    setSection("predict");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 bg-transparent">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNav("home")}> 
          <img src={nexusLogo} alt="Nexus Logo" className="w-10 h-10 mr-2" />
          <span className="text-3xl font-extrabold text-white tracking-tight">NEXUS</span>
        </div>
        <div className="space-x-4">
          <button onClick={() => handleNav("register")} className="text-white hover:text-indigo-300 font-medium transition">Register</button>
          <button onClick={() => handleNav("login")} className="text-white hover:text-indigo-300 font-medium transition">Login</button>
          <button onClick={() => handleNav("predict")} className="text-white hover:text-indigo-300 font-medium transition">Predict</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 w-full">
        {section === "home" && (
          <>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
              Predict Your <span className="text-indigo-400">Stroke Risk</span> Instantly
            </h1>
            <p className="text-lg md:text-2xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Nexus uses advanced AI to help you assess your risk of stroke in seconds. Get personalized insights and a downloadable report—fast, private, and secure.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button onClick={() => handleNav("predict")} className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg transition">Get Started</button>
              <button onClick={() => handleNav("register")} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-indigo-100 rounded-lg text-lg font-semibold border border-indigo-400 shadow-lg transition">Register</button>
            </div>
          </>
        )}
        {section === "register" && <Register onRegistered={handleRegistered} />}
        {section === "login" && <Login onLoginSuccess={handleLoginSuccess} />}
        {section === "predict" && <PredictForm username={loggedInUser} />}
      </main>

      {/* Footer */}
      <footer className="text-center text-indigo-200 py-6 text-sm">
        &copy; {new Date().getFullYear()} Nexus. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
