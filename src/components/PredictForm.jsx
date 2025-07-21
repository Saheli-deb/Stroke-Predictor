import React, { useState } from "react";

const initialState = {
  username: "",
  gender: "Male",
  age: "",
  hypertension: 0,
  heart_disease: 0,
  ever_married: "No",
  work_type: "Private",
  Residence_type: "Urban",
  avg_glucose_level: "",
  bmi: "",
  smoking_status: "never smoked",
};

const PredictForm = () => {
  const [form, setForm] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === "number" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.detail || "Prediction failed.");
      }
    } catch (err) {
      setError("Network error.");
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (result && result.username) {
      window.open(`http://localhost:8000/download-pdf/${result.username}`, "_blank");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/90 rounded-xl shadow-lg p-8 mt-12">
      <h2 className="text-2xl font-bold mb-6 text-indigo-800 text-center">Stroke Risk Prediction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="username" placeholder="Username (registered)" value={form.username} onChange={handleChange} required className="col-span-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <div>
          <label className="block text-indigo-700 font-medium mb-1">Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-indigo-700 font-medium mb-1">Age</label>
          <input type="number" name="age" value={form.age} onChange={handleChange} required min="0" className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-indigo-700 font-medium mb-1">Hypertension</label>
          <select name="hypertension" value={form.hypertension} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>
        <div>
          <label className="block text-indigo-700 font-medium mb-1">Heart Disease</label>
          <select name="heart_disease" value={form.heart_disease} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>
        <div>
          <label className="block text-indigo-700 font-medium mb-1">Ever Married</label>
          <select name="ever_married" value={form.ever_married} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>
        <div>
          <label className="block text-indigo-700 font-medium mb-1">Work Type</label>
          <select name="work_type" value={form.work_type} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
            <option>Private</option>
            <option>Self-employed</option>
            <option>Govt_job</option>
            <option>children</option>
            <option>Never_worked</option>
          </select>
        </div>
        <div>
          <label className="block text-indigo-700 font-medium mb-1">Residence Type</label>
          <select name="Residence_type" value={form.Residence_type} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
            <option>Urban</option>
            <option>Rural</option>
          </select>
        </div>
        <div>
          <label className="block text-indigo-700 font-medium mb-1">Avg Glucose Level</label>
          <input type="number" name="avg_glucose_level" value={form.avg_glucose_level} onChange={handleChange} required min="0" step="0.01" className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-indigo-700 font-medium mb-1">BMI</label>
          <input type="number" name="bmi" value={form.bmi} onChange={handleChange} required min="0" step="0.1" className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-indigo-700 font-medium mb-1">Smoking Status</label>
          <select name="smoking_status" value={form.smoking_status} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
            <option>never smoked</option>
            <option>formerly smoked</option>
            <option>smokes</option>
            <option>Unknown</option>
          </select>
        </div>
        <button type="submit" className="col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition mt-4" disabled={loading}>
          {loading ? "Predicting..." : "Predict Stroke Risk"}
        </button>
      </form>
      {error && <div className="mt-4 text-center text-red-600 font-medium">{error}</div>}
      {result && (
        <div className="mt-8 bg-indigo-50 rounded-lg p-6 text-center">
          <div className="text-xl font-bold text-indigo-800 mb-2">{result.message}</div>
          <div className="text-lg text-indigo-700 mb-2">Probability: <span className="font-mono">{result.probability}</span></div>
          <div className="text-lg text-indigo-700 mb-4">Prediction: <span className="font-semibold">{result.prediction === 1 ? "Stroke" : "No Stroke"}</span></div>
          <button onClick={handleDownload} className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold transition">Download PDF Report</button>
        </div>
      )}
    </div>
  );
};

export default PredictForm; 