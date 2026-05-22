import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero'>
      <span className="hero-badge">🌾 AI-Powered Agriculture</span>
      <h1>Grow Smarter with <em>Intelligent</em> Crop Advice</h1>
      <p>
        Enter your soil and climate data and get an instant AI prediction
        of the best crop to cultivate — no guesswork needed.
      </p>
      <Link to='/predict' className="hero-cta">Start Prediction →</Link>

      <div className="hero-stats">
        <div className="stat">
          <div className="stat-num">7</div>
          <div className="stat-label">Input Factors</div>
        </div>
        <div className="stat">
          <div className="stat-num">22+</div>
          <div className="stat-label">Crop Types</div>
        </div>
        <div className="stat">
          <div className="stat-num">ML</div>
          <div className="stat-label">Powered</div>
        </div>
      </div>
    </div>
  )
}

export default Hero