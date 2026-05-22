import React from 'react'

const ResultCard = ({ result }) => {
  return (
    <div className="result-card">
      <h2>Recommended Crop 🌱</h2>
      <h1>{result}</h1>
    </div>
  )
}

export default ResultCard