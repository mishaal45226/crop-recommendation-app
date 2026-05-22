import React, { useState } from "react"
import axios from "axios"
import "../App.css"

const fields = [
  { name: "Nitrogen",    label: "Nitrogen (N)",    placeholder: "e.g. 90",  unit: "kg/ha", icon: "🧪" },
  { name: "Phosphorous", label: "Phosphorous (P)", placeholder: "e.g. 42",  unit: "kg/ha", icon: "🧫" },
  { name: "Potassium",   label: "Potassium (K)",   placeholder: "e.g. 43",  unit: "kg/ha", icon: "⚗️"  },
  { name: "Temperature", label: "Temperature",     placeholder: "e.g. 25",  unit: "°C",    icon: "🌡️" },
  { name: "Humidity",    label: "Humidity",        placeholder: "e.g. 80",  unit: "%",     icon: "💧" },
  { name: "pH",          label: "Soil pH",         placeholder: "e.g. 6.5", unit: "pH",    icon: "🌍" },
  { name: "Rainfall",    label: "Rainfall",        placeholder: "e.g. 200", unit: "mm",    icon: "🌧️" },
]

// ✅ Reads from env variable — no hardcoded URLs
// Local dev:   set VITE_API_URL in .env.local
// Production:  set VITE_API_URL in Netlify → Site settings → Environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"

const CropForm = () => {
  const [formData, setFormData] = useState({
    Nitrogen: "", Phosphorous: "", Potassium: "",
    Temperature: "", Humidity: "", pH: "", Rainfall: ""
  })
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setResult("")
    setLoading(true)
    try {
      const res = await axios.post(`${API_URL}/predict`, formData, {
        headers: { "Content-Type": "application/json" }
      })
      if (res.data.crop) {
        setResult(res.data.crop)
      } else {
        setError("No crop returned from backend.")
      }
    } catch (err) {
      if (err.response) {
        const detail = err.response.data?.error || JSON.stringify(err.response.data)
        setError("Backend error " + err.response.status + ": " + detail)
      } else {
        setError("Could not reach the backend. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="crop-container">
      <div className="crop-form">
        <div className="form-header">
          <span className="form-icon">🌾</span>
          <h1>Crop Predictor</h1>
          <p className="form-subtitle">Enter your soil &amp; climate data below</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="fields-grid">
            {fields.map(({ name, label, placeholder, unit, icon }) => (
              <div className="field-group" key={name}>
                <label>
                  <span className="field-icon">{icon}</span>
                  {label}
                </label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    step="any"
                    required
                  />
                  <span className="unit-badge">{unit}</span>
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <span className="spinner" /> Analysing...
              </span>
            ) : (
              "🔍 Predict Best Crop"
            )}
          </button>
        </form>

        {result && (
          <div className="result-card success">
            <div className="result-icon">🌱</div>
            <p className="result-label">Recommended Crop</p>
            <h2 className="result-crop">{result.charAt(0).toUpperCase() + result.slice(1)}</h2>
          </div>
        )}

        {error && (
          <div className="result-card error-card">
            <div className="result-icon">⚠️</div>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CropForm