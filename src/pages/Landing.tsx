import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import './Landing.css';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="stars-overlay"></div>
      <div className="grid-overlay"></div>
      
      <main className="hero-section">
        <div className="status-bar ui-text">
          <Terminal size={14} />
          <span>SYSTEM STATUS: ONLINE</span>
          <span className="separator">|</span>
          <span>LOCATION: SECTOR-001</span>
        </div>

        <h1 className="main-title" data-text="WE ARE THE GODS NOW">
          WE ARE THE GODS NOW
        </h1>
        
        <h2 className="sub-title">
          Humanity's 1000-Year Journey From Earth to Eternity
        </h2>

        <div className="tagline-container">
          <p className="tagline">
            "Religion told us to look inward. Science dared us to look up. <br />
            <span className="cyan-text">One of them took us to the moon.</span>"
          </p>
        </div>

        <button 
          className="initiate-btn ui-text" 
          onClick={() => navigate('/prologue/prologue')}
        >
          <span className="btn-glitch"></span>
          INITIATE SEQUENCE
        </button>
      </main>

      <footer className="landing-footer ui-text">
        <div className="footer-item">EST. 2026</div>
        <div className="footer-item">INTERPLANETARY EBOOK EXPERIENCE</div>
      </footer>
    </div>
  );
};

export default Landing;
